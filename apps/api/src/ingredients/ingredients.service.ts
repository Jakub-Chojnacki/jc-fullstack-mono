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

  async get({ userId, query }: { userId: string; query: TIngredientGetQuery }) {
    const where = this.buildIngredientFilter(userId, query);

    const pagination = validatePagination(query);

    const [data, totalCount] = await Promise.all([
      this.prisma.ingredient.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.ingredient.count({ where }),
    ]);

    return createPaginatedResponse(data, totalCount, pagination);
  }

  private buildIngredientFilter(
    userId: string,
    query: TIngredientGetQuery,
  ): Prisma.IngredientWhereInput {
    const { queryFilter, isDeleted, search } = query;

    const baseFilter: Prisma.IngredientWhereInput = {};

    // Only add isDeleted filter if it's explicitly provided
    if (isDeleted !== undefined) {
      baseFilter.isDeleted = isDeleted;
    }

    // Add search filter if search term is provided
    if (search && typeof search === 'string' && search.trim()) {
      baseFilter.name = {
        contains: search.trim(),
        mode: 'insensitive' as const,
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

    if (queryFilter === 'USER') {
      return {
        ...baseFilter,
        isGlobal: false,
        userId,
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
    userId: string;
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
