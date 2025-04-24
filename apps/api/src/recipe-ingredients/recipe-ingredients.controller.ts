import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { RecipeIngredientsService } from './recipe-ingredients.service';

@Controller()
export class RecipeIngredientsController {
  constructor(
    private readonly recipeIngredientsService: RecipeIngredientsService,
  ) {}

  @TsRestHandler(contract.recipeIngredients.create)
  create() {
    return tsRestHandler(
      contract.recipeIngredients.create,
      async ({ body }) => {
        const createdRecipeIngredient =
          await this.recipeIngredientsService.create(body);

        return {
          status: 201,
          body: createdRecipeIngredient,
        };
      },
    );
  }

  @TsRestHandler(contract.recipeIngredients.update)
  update() {
    return tsRestHandler(
      contract.recipeIngredients.update,
      async ({ body, params: { id } }) => {
        const updatedRecipeIngredient =
          await this.recipeIngredientsService.update({ id, body });

        return {
          status: 201,
          body: updatedRecipeIngredient,
        };
      },
    );
  }

  @TsRestHandler(contract.recipeIngredients.delete)
  delete() {
    return tsRestHandler(
      contract.recipeIngredients.delete,
      async ({ params: { id } }) => {
        const deletedRecipeIngredient =
          await this.recipeIngredientsService.delete({ id });

        return {
          status: 200,
          body: deletedRecipeIngredient,
        };
      },
    );
  }
}
