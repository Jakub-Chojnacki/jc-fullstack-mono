import {
  contract,
  TShoppingListIngredientCreate,
  TShoppingListIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

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
    return wrapWithTsRestError(contract.shoppingListIngredient.delete, () =>
      this.prisma.shoppingListIngredient.delete({
        where: {
          id,
        },
      }),
    );
  }

  async update(id: number, data: TShoppingListIngredientUpdate) {
    return wrapWithTsRestError(contract.shoppingListIngredient.update, () =>
      this.prisma.shoppingListIngredient.update({
        where: {
          id,
        },
        data,
      }),
    );
  }
}
