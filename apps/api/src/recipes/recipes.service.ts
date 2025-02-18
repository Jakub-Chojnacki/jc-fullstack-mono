import { TRecipeCreate, TRecipeUpdate } from '@jcmono/api-contract';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getGlobal() {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        isGlobal: true,
      },
    });

    return recipes;
  }

  async getForUser(userId: number) {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        userId,
      },
    });

    return recipes;
  }

  async create(body: TRecipeCreate) {
    const recipe = await this.prisma.recipe.create({
      data: body,
    });

    return recipe;
  }

  async delete(id: number) {
    try {
      return await this.prisma.recipe.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Recipe not found');
      }
      throw error;
    }
  }

  async update(id: number, body: TRecipeUpdate) {
    try {
      return await this.prisma.recipe.update({ where: { id }, data: body });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Recipe not found');
      }
      throw error;
    }
  }
}
