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
}
