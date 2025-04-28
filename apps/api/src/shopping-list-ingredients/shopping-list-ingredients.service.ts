import {
  contract,
  TShoppingListIngredientCreate,
  type TShoppingListIngredientGetQuery,
  TShoppingListIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class ShoppingListIngredientsService {
  constructor(private prisma: PrismaService) {}

  get({
    isDone,
    userId,
    page = 1,
    take = 50,
  }: TShoppingListIngredientGetQuery & { userId: number }) {
    return wrapWithTsRestError(
      contract.shoppingListIngredient.get,
      async () =>
        await this.prisma.shoppingListIngredient.findMany({
          where: {
            isDone,
            userId,
            isDeleted: false,
          },
          take: 50,
          skip: take * (page - 1),
          orderBy: {
            createdAt: 'desc',
          },
        }),
    );
  }

  create(body: TShoppingListIngredientCreate, userId: number) {
    return wrapWithTsRestError(
      contract.shoppingListIngredient.delete,
      async () => {
        const shoppingListIngredient =
          await this.prisma.shoppingListIngredient.create({
            data: { ...body, userId },
          });

        return shoppingListIngredient;
      },
    );
  }

  createFromRecipe(recipeId: number, userId: number) {
    return wrapWithTsRestError(
      contract.shoppingListIngredient.delete,
      async () => {
        const recipe = await this.prisma.recipe.findUnique({
          where: {
            id: recipeId,
          },
          select: {
            recipeIngredients: {
              select: {
                id: true,
                amount: true,
                unit: true,
                ingredientId: true,
              },
            },
          },
        });

        if (!recipe) {
          throw new Error('Recipe not found');
        }

        const shoppingListIngredientsToCreate = recipe.recipeIngredients.map(
          (ingredient) => ({
            ...ingredient,
            userId,
            isDone: false,
            isDeleted: false,
          }),
        );

        const shoppingListIngredients =
          await this.prisma.shoppingListIngredient.createManyAndReturn({
            data: shoppingListIngredientsToCreate,
          });

        return shoppingListIngredients;
      },
    );
  }

  delete(id: number, userId: number) {
    return wrapWithTsRestError(
      contract.shoppingListIngredient.delete,
      async () =>
        await this.prisma.shoppingListIngredient.update({
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

  update({
    data,
    id,
    userId,
  }: {
    id: number;
    data: TShoppingListIngredientUpdate;
    userId: number;
  }) {
    return wrapWithTsRestError(
      contract.shoppingListIngredient.update,
      async () =>
        await this.prisma.shoppingListIngredient.update({
          where: {
            id,
            userId,
          },
          data,
        }),
    );
  }
}
