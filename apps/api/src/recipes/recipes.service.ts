import {
  TRecipeCreate,
  TRecipeGetQuery,
  TRecipeUpdate,
} from '@jcmono/api-contract';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MealType, Prisma } from '@prisma/client';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  createPaginatedResponse,
  validatePagination,
} from 'src/utils/pagination';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  private validateNoDuplicateIngredients(
    recipeIngredients: { ingredientId: number }[],
  ) {
    const ingredientIds = recipeIngredients.map((ri) => ri.ingredientId);
    const uniqueIngredientIds = new Set(ingredientIds);

    if (ingredientIds.length !== uniqueIngredientIds.size) {
      throw new BadRequestException(
        'Cannot add the same ingredient to a recipe twice',
      );
    }
  }

  async get({ userId, query }: { userId: string; query: TRecipeGetQuery }) {
    const where = this.buildRecipeFilter(userId, query);

    const pagination = validatePagination(query);

    const [data, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.recipe.count({ where }),
    ]);

    return createPaginatedResponse(data, totalCount, pagination);
  }

  private buildRecipeFilter(
    userId: string,
    query: TRecipeGetQuery,
  ): Prisma.RecipeWhereInput {
    const { queryFilter, isDeleted, search } = query;

    const baseFilter: Prisma.RecipeWhereInput = {};

    // Only add isDeleted filter if it's explicitly provided
    if (isDeleted !== undefined) {
      baseFilter.isDeleted = isDeleted;
    }

    // Add search filter if search term is provided
    if (search && typeof search === 'string' && search.trim()) {
      baseFilter.OR = [
        {
          name: {
            contains: search.trim(),
            mode: 'insensitive' as const,
          },
        },
      ];
    }

    if (queryFilter === 'ALL') {
      const userOrGlobalFilter = [{ userId }, { isGlobal: true }];

      // If we already have search filters, combine them
      if (baseFilter.OR) {
        return {
          ...baseFilter,
          AND: [{ OR: userOrGlobalFilter }, { OR: baseFilter.OR }],
        };
      }

      return {
        ...baseFilter,
        OR: userOrGlobalFilter,
      };
    }

    if (queryFilter === 'GLOBAL') {
      return {
        ...baseFilter,
        isGlobal: true,
      };
    }

    if (queryFilter === 'USER') {
      return {
        ...baseFilter,
        isGlobal: false,
        userId,
      };
    }

    return {
      ...baseFilter,
      userId,
    };
  }

  async getOne(id: number, userId: string, withIngredients?: boolean) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        recipeIngredients: withIngredients,
      },
    });

    if (withIngredients && recipe) {
      const ingredients = await this.prisma.ingredient.findMany({
        where: {
          id: {
            in: recipe.recipeIngredients.map((i) => i.ingredientId) || [],
          },
        },
      });

      return {
        ...recipe,
        recipeIngredients: recipe.recipeIngredients.map((recipeIngredient) => ({
          ...recipeIngredient,
          name: ingredients.find(
            (ingredient) => ingredient.id === recipeIngredient.ingredientId,
          )?.name,
        })),
      };
    }

    return recipe;
  }

  async create({ recipeIngredients, ...body }: TRecipeCreate) {
    // Validate no duplicate ingredients
    this.validateNoDuplicateIngredients(recipeIngredients);

    const recipe = await this.prisma.recipe.create({
      data: {
        ...body,
        mealTypes: body.mealTypes as unknown as MealType[],
      },
    });

    await this.prisma.recipeIngredient.createMany({
      data: recipeIngredients.map((recipeIngredient) => ({
        ...recipeIngredient,
        recipeId: recipe.id,
      })),
    });

    return recipe;
  }

  async delete({ id, userId }: TBaseDeleteParams) {
    return await this.prisma.recipe.update({
      where: {
        id,
        userId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async update(id: number, { recipeIngredients, ...body }: TRecipeUpdate) {
    // Validate no duplicate ingredients in the incoming data
    this.validateNoDuplicateIngredients(recipeIngredients);

    const existingIngredients = await this.prisma.recipeIngredient.findMany({
      where: { recipeId: id },
      select: { id: true },
    });

    const existingIngredientIds = new Set(existingIngredients.map((i) => i.id));

    const incomingIngredientIds = new Set(
      recipeIngredients.map((i) => i.id).filter((id): id is number => !!id),
    );

    type TIngredientToAddWithRecipeId =
      TRecipeUpdate['recipeIngredients'][0] & {
        recipeId: number;
      };

    type TIngredientToAdd = Omit<TIngredientToAddWithRecipeId, 'id'>;

    const ingredientsToAdd: TIngredientToAdd[] = [];
    const ingredientsToUpdate: TRecipeUpdate['recipeIngredients'] = [];

    for (const ingredient of recipeIngredients) {
      if (!ingredient.id) {
        ingredientsToAdd.push({ ...ingredient, recipeId: id });
      } else {
        ingredientsToUpdate.push(ingredient);
      }
    }

    const ingredientsToDelete = [...existingIngredientIds].filter(
      (id) => !incomingIngredientIds.has(id),
    );

    const transaction = await this.prisma.$transaction(async (prisma) => {
      const updateRecipePromise = prisma.recipe.update({
        where: {
          id,
        },
        data: {
          ...body,
          mealTypes: body.mealTypes as unknown as MealType[],
        },
      });

      const deleteIngredientsPromise = ingredientsToDelete.length
        ? prisma.recipeIngredient.deleteMany({
            where: {
              id: {
                in: ingredientsToDelete,
              },
            },
          })
        : Promise.resolve();

      const createIngredientsPromise = ingredientsToAdd.length
        ? prisma.recipeIngredient.createMany({
            data: ingredientsToAdd.map((recipeIngredient) => ({
              ...recipeIngredient,
              recipeId: id,
            })),
          })
        : Promise.resolve();

      const updateIngredientsPromise = ingredientsToUpdate.length
        ? ingredientsToUpdate.map((recipeIngredient) =>
            prisma.recipeIngredient.update({
              where: { id: recipeIngredient.id },
              data: recipeIngredient,
            }),
          )
        : Promise.resolve();

      return await Promise.all([
        updateRecipePromise,
        deleteIngredientsPromise,
        createIngredientsPromise,
        updateIngredientsPromise,
      ]);
    });

    return transaction[0];
  }
}
