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

  get({ isDone, userId }: { isDone: boolean | undefined; userId: number }) {
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

  update(id: number, data: TShoppingListIngredientUpdate, userId: number) {
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
