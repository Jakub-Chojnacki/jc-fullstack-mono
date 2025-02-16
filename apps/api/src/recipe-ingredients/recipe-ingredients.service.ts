import { TRecipeIngredientCreate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const updatedRecipeIngredient = await this.prisma.recipeIngredient.update({
      where: { id },
      data: body,
    });

    return updatedRecipeIngredient;
  }

  async delete(id: number) {
    const deletedRecipeIngredient = await this.prisma.recipeIngredient.delete({
      where: { id },
    });

    return deletedRecipeIngredient;
  }
}
