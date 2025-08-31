import {
  TIngredientCreate,
  TIngredientGetQuery,
  TIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  createPaginatedResponse,
  validatePagination,
} from 'src/utils/pagination';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async get({ userId, query }: { userId: number; query: TIngredientGetQuery }) {
    const where = this.buildIngredientFilter(userId, query);

    const pagination = validatePagination(query);

    const finalPagination = pagination || {
      skip: 0,
      take: 20,
      page: 1,
    };

    const [data, totalCount] = await Promise.all([
      this.prisma.ingredient.findMany({
        where,
        skip: finalPagination.skip,
        take: finalPagination.take,
      }),
      this.prisma.ingredient.count({ where }),
    ]);

    return createPaginatedResponse(data, totalCount, finalPagination);
  }

  private buildIngredientFilter(
    userId: number,
    query: TIngredientGetQuery,
  ): Prisma.IngredientWhereInput {
    const { queryFilter, isDeleted, search } = query;

    const baseFilter: Prisma.IngredientWhereInput = { isDeleted };

    // Add search filter if search term is provided
    if (search && typeof search === 'string' && search.trim()) {
      baseFilter.name = {
        contains: search.trim(),
        mode: 'insensitive' as const, // Case-insensitive search
      };
    }

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
