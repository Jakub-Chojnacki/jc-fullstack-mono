import {
  contract,
  TIngredientCreate,
  TIngredientGetQuery,
  TIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  get({ userId, query }: { userId: number; query: TIngredientGetQuery }) {
    return wrapWithTsRestError(contract.recipes.get, async () => {
      const where = this.buildIngredientFilter(userId, query);

      return this.prisma.ingredient.findMany({
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

  async create(body: TIngredientCreate) {
    const ingredient = await this.prisma.ingredient.create({
      data: body,
    });

    return ingredient;
  }

  async delete(id: number) {
    return wrapWithTsRestError(contract.ingredients.delete, () =>
      this.prisma.ingredient.delete({
        where: {
          id,
        },
      }),
    );
  }

  async update(id: number, body: TIngredientUpdate) {
    return wrapWithTsRestError(contract.ingredients.update, () =>
      this.prisma.ingredient.update({
        where: {
          id,
        },
        data: body,
      }),
    );
  }
}
