import {
  TIngredientCreate,
  TIngredientGetQuery,
  TIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DEFAULT_TAKE } from 'src/common/constants/main';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { validatePagination } from 'src/utils/pagination';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async get({ userId, query }: { userId: number; query: TIngredientGetQuery }) {
    const where = this.buildIngredientFilter(userId, query);

    const pagination = validatePagination(query);

    if (pagination) {
      return await this.prisma.ingredient.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
      });
    }

    return await this.prisma.ingredient.findMany({
      where,
      take: DEFAULT_TAKE,
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

  async delete({ id, userId }: TBaseDeleteParams) {
    return await this.prisma.ingredient.update({
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
    id,
    body,
    userId,
  }: {
    id: number;
    body: TIngredientUpdate;
    userId: number;
  }) {
    return await this.prisma.ingredient.update({
      where: {
        id,
        userId,
      },
      data: body,
    });
  }
}
