import {
  contract,
  TIngredientCreate,
  TIngredientGetQuery,
  TIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  get({ userId, query }: { userId: number; query: TIngredientGetQuery }) {
    return wrapWithTsRestError(contract.recipes.get, async () => {
      const where = this.buildIngredientFilter(userId, query);

      return await this.prisma.ingredient.findMany({
        where,
      });
    });
  }

  private buildIngredientFilter(
    userId: number,
    query: TIngredientGetQuery,
  ): Prisma.IngredientWhereInput {
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

  create(body: TIngredientCreate) {
    return wrapWithTsRestError(contract.ingredients.create, async () => {
      const ingredient = await this.prisma.ingredient.create({
        data: body,
      });

      return ingredient;
    });
  }

  delete({ id, userId }: TBaseDeleteParams) {
    return wrapWithTsRestError(
      contract.ingredients.delete,
      async () =>
        await this.prisma.ingredient.update({
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
    id,
    body,
    userId,
  }: {
    id: number;
    body: TIngredientUpdate;
    userId: number;
  }) {
    return wrapWithTsRestError(
      contract.ingredients.update,
      async () =>
        await this.prisma.ingredient.update({
          where: {
            id,
            userId,
          },
          data: body,
        }),
    );
  }
}
