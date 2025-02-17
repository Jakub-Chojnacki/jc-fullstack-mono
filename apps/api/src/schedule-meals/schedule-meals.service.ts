import {
  TScheduleMealsCreate,
  TScheduleMealsUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const updatedRecipe = await this.prisma.scheduledMeal.update({
      where: {
        id,
      },
      data: body,
    });

    return updatedRecipe;
  }

  async delete(id: number) {
    const deletedSchedule = await this.prisma.scheduledMeal.delete({
      where: {
        id,
      },
    });

    return deletedSchedule;
  }

  async get(userId: number) {
    const recipes = await this.prisma.scheduledMeal.findMany({
      where: {
        userId,
      },
    });

    return recipes;
  }
}
