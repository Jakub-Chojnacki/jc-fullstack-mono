import {
  contract,
  TScheduleMealsCreate,
  TScheduleMealsUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class ScheduleMealsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, body: TScheduleMealsCreate) {
    return wrapWithTsRestError(contract.scheduleMeals.create, async () => {
      const scheduledMeal = await this.prisma.scheduledMeal.create({
        data: { userId, ...body },
      });

      return scheduledMeal;
    });
  }

  update(id: number, body: TScheduleMealsUpdate) {
    return wrapWithTsRestError(
      contract.scheduleMeals.update,
      async () =>
        await this.prisma.scheduledMeal.update({
          where: {
            id,
          },
          data: { ...body, scheduledAt: new Date(body.scheduledAt) },
        }),
    );
  }

  delete({ id, userId }: TBaseDeleteParams) {
    return wrapWithTsRestError(
      contract.scheduleMeals.delete,
      async () =>
        await this.prisma.scheduledMeal.delete({
          where: {
            id,
            userId,
          },
        }),
    );
  }

  async get({
    userId,
    startDate,
    endDate,
  }: {
    userId: number;
    startDate: string;
    endDate: string;
  }) {
    return wrapWithTsRestError(contract.scheduleMeals.get, async () => {
      const scheduledMeals = await this.prisma.scheduledMeal.findMany({
        where: {
          userId,
          scheduledAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        include: {
          recipe: true,
        },
      });

      return scheduledMeals;
    });
  }

  getById(userId: number, id: number) {
    return wrapWithTsRestError(
      contract.scheduleMeals.getById,
      async () =>
        await this.prisma.scheduledMeal.findFirst({
          where: {
            userId,
            id,
          },
          include: {
            recipe: true,
          },
        }),
    );
  }
}
