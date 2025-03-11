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

  async create(body: TScheduleMealsCreate) {
    const scheduledMeal = await this.prisma.scheduledMeal.create({
      data: body,
    });

    return scheduledMeal;
  }

  async update(id: number, body: TScheduleMealsUpdate) {
    return wrapWithTsRestError(contract.scheduleMeals.delete, () =>
      this.prisma.scheduledMeal.update({
        where: {
          id,
        },
        data: body,
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

  async get(userId: number) {
    const scheduledMeals = await this.prisma.scheduledMeal.findMany({
      where: {
        userId,
      },
    });

    return scheduledMeals;
  }
}
