import {
  contract,
  TRecipeCreate,
  TRecipeGetQuery,
  TRecipeUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  get({ userId, query }: { userId: number; query: TRecipeGetQuery }) {
    return wrapWithTsRestError(contract.recipes.get, async () => {
      const where = this.buildRecipeFilter(userId, query);

      return this.prisma.recipe.findMany({
        where,
      });
    });
  }

  private buildRecipeFilter(
    userId: number,
    query: TRecipeGetQuery,
  ): Prisma.RecipeWhereInput {
    const { queryFilter, isDeleted } = query;

    const baseFilter = { isDeleted };

    if (queryFilter === 'ALL') {
      return {
        ...baseFilter,
        OR: [{ userId }, { isGlobal: true }],
      };
    }

    if (queryFilter === 'GLOBAL') {
      return {
        ...baseFilter,
        isGlobal: true,
      };
    }

    return {
      ...baseFilter,
      userId,
    };
  }

  async getOne(id: number, userId: number, withIngredients?: string) {
    return wrapWithTsRestError(contract.recipes.getOne, async () => {
      const recipe = await this.prisma.recipe.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          recipeIngredients: true,
        },
      });

      const sendIngredients = withIngredients === 'true';

      if (sendIngredients) {
        const ingredients = await this.prisma.ingredient.findMany({
          where: {
            id: {
              in: recipe?.recipeIngredients.map((i) => i.ingredientId) || [],
            },
          },
        });

        return {
          ...recipe,
          recipeIngredients: recipe?.recipeIngredients.map(
            (recipeIngredient) => ({
              ...recipeIngredient,
              name: ingredients.find(
                (ingredient) => ingredient.id === recipeIngredient.ingredientId,
              )?.name,
            }),
          ),
        };
      }

      return recipe;
    });
  }

  async create({ recipeIngredients, ...body }: TRecipeCreate) {
    return wrapWithTsRestError(contract.recipes.create, async () => {
      const recipe = await this.prisma.recipe.create({
        data: body,
      });

      await this.prisma.recipeIngredient.createMany({
        data: recipeIngredients.map((recipeIngredient) => ({
          ...recipeIngredient,
          recipeId: recipe.id,
        })),
      });

      return recipe;
    });
  }

  delete({ id, userId }: TBaseDeleteParams) {
    return wrapWithTsRestError(
      contract.recipes.delete,
      async () =>
        await this.prisma.recipe.update({
          where: {
            id,
            userId,
          },
          data: {
            isDeleted: true,
          },
        }),
    );
  }

  async update(id: number, { recipeIngredients, ...body }: TRecipeUpdate) {
    return wrapWithTsRestError(contract.recipes.update, async () => {
      const existingIngredients = await this.prisma.recipeIngredient.findMany({
        where: { recipeId: id },
        select: { id: true },
      });

      const existingIngredientIds = new Set(
        existingIngredients.map((i) => i.id),
      );

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
          data: body,
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

        const updateIngredientsPromise = ingredientsToUpdate.map(
          (recipeIngredient) =>
            prisma.recipeIngredient.update({
              where: { id: recipeIngredient.id },
              data: recipeIngredient,
            }),
        );

        return await Promise.all([
          updateRecipePromise,
          deleteIngredientsPromise,
          createIngredientsPromise,
          ...updateIngredientsPromise,
        ]);
      });

      return transaction[0];
    });
  }
}
