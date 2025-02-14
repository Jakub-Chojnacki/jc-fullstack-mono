import { Controller } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { contract } from '@jcmono/api-contract';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

@Controller('recipe-ingredients')
export class RecipeIngredientsController {
  constructor(
    private readonly recipeIngredientsService: RecipeIngredientsService,
  ) {}

  @TsRestHandler(contract.recipeIngredients.create)
  async create() {
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
}
