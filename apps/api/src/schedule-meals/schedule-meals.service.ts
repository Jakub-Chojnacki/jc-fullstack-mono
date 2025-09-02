import {
  EMealTypes,
  TScheduleMealsCreate,
  TScheduleMealsUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
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

  async getSuggestions({
    userId,
    mealType,
  }: {
    userId: number;
    mealType: EMealTypes;
  }): Promise<Recipe[]> {
    // Use raw SQL for true random ordering at the database level
    const suggestions = await this.prisma.$queryRaw<Recipe[]>`
      SELECT * FROM "recipes" 
      WHERE (
        "userId" = ${userId} OR "isGlobal" = true
      ) 
      AND ${mealType} = ANY("mealTypes")
      AND "isDeleted" = false
      ORDER BY RANDOM()
      LIMIT 3
    `;

    return suggestions;
  }
}
