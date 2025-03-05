import {
  TShoppingListIngredientCreate,
  TShoppingListIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingListIngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(body: TShoppingListIngredientCreate) {
    const shoppingListIngredient =
      await this.prisma.shoppingListIngredient.create({
        data: body,
      });

    return shoppingListIngredient;
  }

  async delete(id: number) {
    const deletedShoppingList = await this.prisma.shoppingListIngredient.delete(
      {
        where: {
          id,
        },
      },
    );

    return deletedShoppingList;
  }

  async update(id: number, data: TShoppingListIngredientUpdate) {
    const updatedShoppingList = await this.prisma.shoppingListIngredient.update(
      {
        where: {
          id,
        },
        data,
      },
    );

    return updatedShoppingList;
  }
}
