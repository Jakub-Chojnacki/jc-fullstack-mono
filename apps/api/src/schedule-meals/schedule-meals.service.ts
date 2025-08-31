import {
  TScheduleMealsCreate,
  TScheduleMealsUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { TBaseDeleteParams } from 'src/common/types';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return await this.prisma.scheduledMeal.update({
      where: {
        id,
      },
      data: { ...body, scheduledAt: new Date(body.scheduledAt) },
    });
  }

  async delete({ id, userId }: TBaseDeleteParams) {
    return await this.prisma.scheduledMeal.delete({
      where: {
        id,
        userId,
      },
    });
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
  }

  async getById(userId: number, id: number) {
    return await this.prisma.scheduledMeal.findFirst({
      where: {
        userId,
        id,
      },
      include: {
        recipe: true,
      },
    });
  }
}
