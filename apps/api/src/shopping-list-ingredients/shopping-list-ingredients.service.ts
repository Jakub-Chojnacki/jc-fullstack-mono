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
    userId,
    take = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
  }: TShoppingListIngredientGetQuery & { userId: string }) {
    const where: {
      isDone?: boolean;
      userId: string;
    } = {
      isDone,
      userId,
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
    userId: string,
    ingredientsToBeAddedCount: number = 1,
  ) {
    const currentCount = await this.prisma.shoppingListIngredient.count({
      where: {
        userId,
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

  async create(body: TShoppingListIngredientCreate, userId: string) {
    const existingIngredient =
      await this.prisma.shoppingListIngredient.findFirst({
        where: {
          userId,
          ingredientId: body.ingredientId,
          unit: body.unit,
        },
      });

    if (existingIngredient) {
      // If ingredient exists, add to the existing amount
      return await this.prisma.shoppingListIngredient.update({
        where: {
          id: existingIngredient.id,
        },
        data: {
          amount: existingIngredient.amount + body.amount,
          isDone: false,
        },
      });
    } else {
      // If ingredient doesn't exist, create a new one
      await this.checkIngredientLimit(userId);

      const shoppingListIngredient =
        await this.prisma.shoppingListIngredient.create({
          data: { ...body, userId },
        });

      return shoppingListIngredient;
    }
  }

  async createFromRecipe(recipeId: number, userId: string) {
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

    const results: Awaited<
      ReturnType<typeof this.prisma.shoppingListIngredient.create>
    >[] = [];

    // Process each ingredient individually to handle merging
    for (const ingredient of recipe.recipeIngredients) {
      const existingIngredient =
        await this.prisma.shoppingListIngredient.findFirst({
          where: {
            userId,
            ingredientId: ingredient.ingredientId,
            unit: ingredient.unit,
          },
        });

      if (existingIngredient) {
        // If ingredient exists, add to the existing amount
        const updated = await this.prisma.shoppingListIngredient.update({
          where: {
            id: existingIngredient.id,
          },
          data: {
            amount: existingIngredient.amount + ingredient.amount,
            isDone: false,
          },
        });
        results.push(updated);
      } else {
        // If ingredient doesn't exist, create a new one
        await this.checkIngredientLimit(userId, 1);

        const created = await this.prisma.shoppingListIngredient.create({
          data: {
            ...ingredient,
            userId,
            isDone: false,
          },
        });
        results.push(created);
      }
    }

    return results;
  }

  async delete(id: number, userId: string) {
    return await this.prisma.shoppingListIngredient.delete({
      where: {
        id,
        userId,
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
    userId: string;
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
