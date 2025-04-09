import { contract, TRecipeIngredientCreate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

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

  update({ id, body }: { id: number; body: TRecipeIngredientCreate }) {
    return wrapWithTsRestError(
      contract.recipeIngredients.update,
      async () =>
        await this.prisma.recipeIngredient.update({
          where: { id },
          data: body,
        }),
    );
  }

  delete({ id }: Pick<TBaseDeleteParams, 'id'>) {
    return wrapWithTsRestError(
      contract.recipeIngredients.delete,
      async () =>
        await this.prisma.recipeIngredient.delete({
          where: { id },
        }),
    );
  }
}
