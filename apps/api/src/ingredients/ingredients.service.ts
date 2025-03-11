import {
  contract,
  TIngredientCreate,
  TIngredientUpdate,
} from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

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
    return wrapWithTsRestError(contract.ingredients.delete, () =>
      this.prisma.ingredient.delete({
        where: {
          id,
        },
      }),
    );
  }

  async update(id: number, body: TIngredientUpdate) {
    return wrapWithTsRestError(contract.ingredients.update, () =>
      this.prisma.ingredient.update({
        where: {
          id,
        },
        data: body,
      }),
    );
  }
}
