import {
  MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
  TShoppingListIngredientCreate,
  type TShoppingListIngredientGetQuery,
  TShoppingListIngredientUpdate,
} from '@jcmono/api-contract';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingListIngredientsService {
  constructor(private prisma: PrismaService) {}

  async get({
    isDone,
    isDeleted,
    userId,
    take = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
  }: TShoppingListIngredientGetQuery & { userId: number }) {
    const where: {
      isDone?: boolean;
      userId: number;
      isDeleted: boolean;
    } = {
      isDone,
      userId,
      // Only add isDeleted filter if it's explicitly provided, otherwise default to false
      isDeleted: isDeleted !== undefined ? Boolean(isDeleted) : false,
    };

    return await this.prisma.shoppingListIngredient.findMany({
      where,
      omit: {
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
      include: {
        ingredient: {
          select: {
            name: true,
          },
        },
      },
      take,
    });
  }

  async checkIngredientLimit(
    userId: number,
    ingredientsToBeAddedCount: number = 1,
  ) {
    const currentCount = await this.prisma.shoppingListIngredient.count({
      where: {
        userId,
        isDeleted: false,
      },
    });

    if (
      currentCount + ingredientsToBeAddedCount >
      MAXIMUM_SAVED_SHOPPING_LIST_ITEMS
    ) {
      throw new BadRequestException(
        `Maximum of ${MAXIMUM_SAVED_SHOPPING_LIST_ITEMS} ingredients reached. Adding this ingredient would make it ${currentCount + ingredientsToBeAddedCount}.`,
      );
    }
  }

  async create(body: TShoppingListIngredientCreate, userId: number) {
    await this.checkIngredientLimit(userId);

    const shoppingListIngredient =
      await this.prisma.shoppingListIngredient.create({
        data: { ...body, userId },
      });

    return shoppingListIngredient;
  }

  async createFromRecipe(recipeId: number, userId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      select: {
        recipeIngredients: {
          select: {
            amount: true,
            unit: true,
            ingredientId: true,
          },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const shoppingListIngredientsToCreate = recipe.recipeIngredients.map(
      (ingredient) => ({
        ...ingredient,
        userId,
        isDone: false,
        isDeleted: false,
      }),
    );

    await this.checkIngredientLimit(
      userId,
      shoppingListIngredientsToCreate.length,
    );

    const shoppingListIngredients =
      await this.prisma.shoppingListIngredient.createManyAndReturn({
        data: shoppingListIngredientsToCreate,
      });

    return shoppingListIngredients;
  }

  async delete(id: number, userId: number) {
    return await this.prisma.shoppingListIngredient.update({
      where: {
        id,
        userId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async update({
    data,
    id,
    userId,
  }: {
    id: number;
    data: TShoppingListIngredientUpdate;
    userId: number;
  }) {
    return await this.prisma.shoppingListIngredient.update({
      where: {
        id,
        userId,
      },
      data,
    });
  }
}
