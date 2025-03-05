import { Controller } from '@nestjs/common';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@jcmono/api-contract';

@Controller()
export class ShoppingListIngredientsController {
  constructor(
    private readonly shoppingListIngredientsService: ShoppingListIngredientsService,
  ) {}

  @TsRestHandler(contract.shoppingListIngredient.create)
  async create() {
    return tsRestHandler(
      contract.shoppingListIngredient.create,
      async ({ body }) => {
        const createdShoppingListIngredient =
          await this.shoppingListIngredientsService.create(body);

        return {
          status: 201,
          body: createdShoppingListIngredient,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingListIngredient.delete)
  async delete() {
    return tsRestHandler(
      contract.shoppingListIngredient.delete,
      async ({ params: { id } }) => {
        const deletedShoppingListIngredient =
          await this.shoppingListIngredientsService.delete(id);

        return {
          status: 200,
          body: deletedShoppingListIngredient,
        };
      },
    );
  }
  @TsRestHandler(contract.shoppingListIngredient.update)
  async update() {
    return tsRestHandler(
      contract.shoppingListIngredient.update,
      async ({ params: { id }, body }) => {
        const updatedShoppingListIngredient =
          await this.shoppingListIngredientsService.update(id, body);

        return {
          status: 200,
          body: updatedShoppingListIngredient,
        };
      },
    );
  }
}
