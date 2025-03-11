import { contract, TRecipeIngredientCreate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class RecipeIngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(body: TRecipeIngredientCreate) {
    const createdRecipeIngredient = await this.prisma.recipeIngredient.create({
      data: body,
    });

    return createdRecipeIngredient;
  }

  async update(id: number, body: TRecipeIngredientCreate) {
    return wrapWithTsRestError(contract.recipeIngredients.update, () =>
      this.prisma.recipeIngredient.update({
        where: { id },
        data: body,
      }),
    );
  }

  async delete(id: number) {
    return wrapWithTsRestError(contract.recipeIngredients.delete, () =>
      this.prisma.recipeIngredient.delete({
        where: { id },
      }),
    );
  }
}
