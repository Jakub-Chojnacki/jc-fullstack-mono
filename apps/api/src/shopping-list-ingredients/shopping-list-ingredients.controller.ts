import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { GetCurrentUserId } from 'src/common/decorators';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

@Controller()
export class ShoppingListIngredientsController {
  constructor(
    private readonly shoppingListIngredientsService: ShoppingListIngredientsService,
  ) {}

  @TsRestHandler(contract.shoppingListIngredient.get)
  get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.shoppingListIngredient.get,
      async ({ query }) => {
        const shoppingListIngredients =
          await this.shoppingListIngredientsService.get({ ...query, userId });

        return {
          status: 200,
          body: shoppingListIngredients,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingListIngredient.create)
  create(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.shoppingListIngredient.create,
      async ({ body }) => {
        const createdShoppingListIngredient =
          await this.shoppingListIngredientsService.create(body, userId);

        return {
          status: 201,
          body: createdShoppingListIngredient,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingListIngredient.createFromRecipe)
  createFromRecipe(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.shoppingListIngredient.createFromRecipe,
      async ({ params: { id } }) => {
        const createdShoppingListIngredient =
          await this.shoppingListIngredientsService.createFromRecipe(
            id,
            userId,
          );

        return {
          status: 201,
          body: createdShoppingListIngredient,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingListIngredient.delete)
  delete(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.shoppingListIngredient.delete,
      async ({ params: { id } }) => {
        await this.shoppingListIngredientsService.delete(id, userId);

        return {
          status: 200,
          body: null,
        };
      },
    );
  }

  @TsRestHandler(contract.shoppingListIngredient.update)
  update(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.shoppingListIngredient.update,
      async ({ params: { id }, body }) => {
        const updatedShoppingListIngredient =
          await this.shoppingListIngredientsService.update({
            id,
            data: body,
            userId,
          });

        return {
          status: 200,
          body: updatedShoppingListIngredient,
        };
      },
    );
  }
}
