import {
  contract,
  TScheduleMealsCreate,
  TScheduleMealsUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class ScheduleMealsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, body: TScheduleMealsCreate) {
    const scheduledMeal = await this.prisma.scheduledMeal.create({
      data: { userId, ...body },
    });

    return scheduledMeal;
  }

  async update(id: number, body: TScheduleMealsUpdate) {
    return wrapWithTsRestError(contract.scheduleMeals.update, () =>
      this.prisma.scheduledMeal.update({
        where: {
          id,
        },
        data: { ...body, scheduledAt: new Date(body.scheduledAt) },
      }),
    );
  }

  async delete(id: number) {
    return wrapWithTsRestError(contract.scheduleMeals.delete, () =>
      this.prisma.scheduledMeal.delete({
        where: {
          id,
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
      });

      return scheduledMeals;
    });
  }

  async getById(userId: number, id: number) {
    return wrapWithTsRestError(contract.scheduleMeals.getById, () =>
      this.prisma.scheduledMeal.findFirst({
        where: {
          userId,
          id,
        },
      }),
    );
  }
}
