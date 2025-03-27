import { contract, TRecipeCreate, TRecipeUpdate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getGlobal() {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        isGlobal: true,
      },
    });

    return recipes;
  }

  async getForUser(userId: number) {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        userId,
      },
    });

    return recipes;
  }

  async getOne(id: number, userId: number) {
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

  async delete(id: number) {
    return wrapWithTsRestError(
      contract.recipes.delete,
      async () =>
        await this.prisma.recipe.delete({
          where: {
            id,
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
