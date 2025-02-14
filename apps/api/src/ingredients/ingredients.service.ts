import { Injectable } from '@nestjs/common';
import { type TIngredient } from 'api-contract';
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

  async getAll() {
    const ingredients = await this.prisma.ingredient.findMany();

    return ingredients;
  }

  async create(body: TIngredient) {
    const ingredient = await this.prisma.ingredient.create({
      data: body,
    });

    return ingredient;
  }

  async delete(id: number) {
    const deletedIngredient = await this.prisma.ingredient.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, body: TIngredient) {
    const updatedIngredient = await this.prisma.ingredient.update({
      where: {
        id,
      },
      data: body,
    });

    return updatedIngredient;
  }
}
