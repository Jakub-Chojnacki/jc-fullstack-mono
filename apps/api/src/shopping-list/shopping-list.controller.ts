import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { GetCurrentUserId } from 'src/common/decorators';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @TsRestHandler(contract.shoppingList.create)
  async create() {
    return tsRestHandler(contract.shoppingList.create, async ({ body }) => {
      const createdShoppingList = await this.shoppingListService.create(body);

      return {
        status: 201,
        body: createdShoppingList,
      };
    });
  }

  @TsRestHandler(contract.shoppingList.delete)
  async delete() {
    return tsRestHandler(
      contract.shoppingList.delete,
      async ({ params: { id } }) => {
        const deletedShoppingList = await this.shoppingListService.delete(id);

        return {
          status: 200,
          body: deletedShoppingList,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingList.get)
  async get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.shoppingList.get, async () => {
      const shoppingLists = await this.shoppingListService.get(userId);

      return {
        status: 200,
        body: shoppingLists,
      };
    });
  }
}
