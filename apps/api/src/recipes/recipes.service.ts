import { contract, TRecipeCreate, TRecipeUpdate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

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

  async getOne(id: number, userId: number) {
    return wrapWithTsRestError(contract.recipes.getOne, async () => {
      const recipe = await this.prisma.recipe.findFirst({
        where: {
          id,
          userId,
        },
      });

      return recipe;
    });
  }

  async create({ recipeIngredients, ...body }: TRecipeCreate) {
    return wrapWithTsRestError(contract.recipes.create, async () => {
      const recipe = await this.prisma.recipe.create({
        data: body,
      });

      await this.prisma.recipeIngredient.createMany({
        data: recipeIngredients.map((recipeIngredient) => ({
          ...recipeIngredient,
          recipeId: recipe.id,
        })),
      });

      return recipe;
    });
  }

  async delete(id: number) {
    return wrapWithTsRestError(contract.recipes.delete, () =>
      this.prisma.recipe.delete({
        where: {
          id,
        },
      }),
    );
  }

  async update(id: number, body: TRecipeUpdate) {
    return wrapWithTsRestError(contract.recipes.update, () =>
      this.prisma.recipe.update({
        where: {
          id,
        },
        data: body,
      }),
    );
  }
}
