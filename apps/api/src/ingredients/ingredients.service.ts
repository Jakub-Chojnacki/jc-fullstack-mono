import { TIngredientCreate, TIngredientUpdate } from '@jcmono/api-contract';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}
  async getForUser(userId: number) {
    const ingredients = await this.prisma.ingredient.findMany({
      where: {
        userId,
      },
    });

    return ingredients;
  }

  async getGlobal() {
    const ingredients = await this.prisma.ingredient.findMany({
      where: {
        isGlobal: true,
      },
    });

    return ingredients;
  }

  async create(body: TIngredientCreate) {
    const ingredient = await this.prisma.ingredient.create({
      data: body,
    });

    return ingredient;
  }

  async delete(id: number) {
    try {
      return await this.prisma.ingredient.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Ingredient not found');
      }
      throw error;
    }
  }

  async update(id: number, body: TIngredientUpdate) {
    try {
      return await this.prisma.ingredient.update({
        where: {
          id,
        },
        data: body,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Ingredient not found');
      }
      throw error;
    }
  }
}
