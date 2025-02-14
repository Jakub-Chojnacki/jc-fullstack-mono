import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async getGlobal() {
    const ingredients = await this.prisma.ingredient.findMany({
      where: {
        isGlobal: true,
      },
    });

    return ingredients;
  }

  async create(body: TIngredient) {
    const ingredient = await this.prisma.ingredient.create({
      data: body,
    });

    return ingredient;
  }

  async findIngredient(id: number) {
    //check if ingredient exists or throw error
    Logger.log(id, 'testLOgger')
    const foundIngredient = await this.prisma.ingredient.findFirst({
      where: {
        id,
      },
    });

    if (!foundIngredient) throw new NotFoundException('Ingredient not found');

    return foundIngredient;
  }

  async delete(id: number) {
    await this.findIngredient(id);

    const deletedIngredient = await this.prisma.ingredient.delete({
      where: {
        id,
      },
    });

    return deletedIngredient;
  }

  async update(id: number, body: TIngredient) {
    await this.findIngredient(id);

    const updatedIngredient = await this.prisma.ingredient.update({
      where: {
        id,
      },
      data: body,
    });

    return updatedIngredient;
  }
}
