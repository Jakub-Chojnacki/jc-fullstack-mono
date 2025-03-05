import { TShoppingListCreate } from '@jcmono/api-contract';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {}

  async create(body: TShoppingListCreate) {
    const shoppingList = await this.prisma.shoppingList.create({
      data: body,
    });

    return { ...shoppingList, ingredients: [] };
  }

  async delete(id: number) {
    const deletedShoppingList = await this.prisma.shoppingList.delete({
      where: {
        id,
      },
    });

    return deletedShoppingList;
  }

  async get(userId: number) {
    const shoppingLists = await this.prisma.shoppingList.findMany({
      where: {
        userId,
      },
      include: {
        ingredients: true,
      },
    });

    return shoppingLists;
  }
}
