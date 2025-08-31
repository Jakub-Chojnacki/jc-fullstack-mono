import { TRecipeIngredientCreate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { TBaseDeleteParams } from 'src/common/types';

@Injectable()
export class RecipeIngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(body: TRecipeIngredientCreate) {
    const createdRecipeIngredient = await this.prisma.recipeIngredient.create({
      data: body,
    });

    return createdRecipeIngredient;
  }

  async update({ id, body }: { id: number; body: TRecipeIngredientCreate }) {
    return await this.prisma.recipeIngredient.update({
      where: { id },
      data: body,
    });
  }

  async delete({ id }: Pick<TBaseDeleteParams, 'id'>) {
    return await this.prisma.recipeIngredient.delete({
      where: { id },
    });
  }
}
