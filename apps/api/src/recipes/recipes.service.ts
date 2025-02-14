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

  async findRecipe(id: number) {
    //check if recipe exists or throw error
    const foundRecipe = await this.prisma.recipe.findFirst({
      where: {
        id,
      },
    });

    if (!foundRecipe) throw new NotFoundException('Recipe not found');

    return foundRecipe;
  }

  async delete(id: number) {
    await this.findRecipe(id);

    const deletedRecipe = await this.prisma.recipe.delete({
      where: {
        id,
      },
    });

    return deletedRecipe;
  }

  async update(id: number, body: TRecipeUpdate) {
    await this.findRecipe(id);

    const updatedRecipe = await this.prisma.recipe.update({
      where: {
        id,
      },
      data: body,
    });

    return updatedRecipe;
  }
}
