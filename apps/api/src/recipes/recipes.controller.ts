import { Controller } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@jcmono/api-contract';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @TsRestHandler(contract.recipes.create)
  async create() {
    return tsRestHandler(contract.recipes.create, async ({ body }) => {
      const createdRecipe = await this.recipesService.create(body);

      return {
        status: 201,
        body: createdRecipe,
      };
    });
  }

  @TsRestHandler(contract.recipes.getForUser)
  async getForUser() {
    return tsRestHandler(
      contract.recipes.getForUser,
      async ({ params: { userId } }) => {
        const recipes = await this.recipesService.getForUser(userId);

        return {
          status: 200,
          body: recipes,
        };
      },
    );
  }

  @TsRestHandler(contract.recipes.getGlobal)
  async getGlobalIngredients() {
    return tsRestHandler(contract.recipes.getGlobal, async () => {
      const recipes = await this.recipesService.getGlobal();

      return {
        status: 200,
        body: recipes,
      };
    });
  }

  @TsRestHandler(contract.recipes.delete)
  async deleteIngredient() {
    return tsRestHandler(
      contract.recipes.delete,
      async ({ params: { id } }) => {
        const recipes = await this.recipesService.delete(id);

        return {
          status: 200,
          body: recipes,
        };
      },
    );
  }

  @TsRestHandler(contract.recipes.update)
  async updateIngredient() {
    return tsRestHandler(
      contract.recipes.update,
      async ({ params: { id }, body }) => {
        const recipes = await this.recipesService.update(id, body);

        return {
          status: 200,
          body: recipes,
        };
      },
    );
  }
}
