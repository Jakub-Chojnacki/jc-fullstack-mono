import { Controller } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@jcmono/api-contract';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @TsRestHandler(contract.recipes.create)
  async create(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.recipes.create, async ({ body }) => {
      const createdRecipe = await this.recipesService.create({
        ...body,
        userId,
      });

      return {
        status: 201,
        body: createdRecipe,
      };
    });
  }

  @TsRestHandler(contract.recipes.get)
  async get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.recipes.get, async ({ query }) => {
      const recipes = await this.recipesService.get({ query, userId });

      return {
        status: 200,
        body: recipes,
      };
    });
  }

  @TsRestHandler(contract.recipes.getOne)
  async getOne(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.recipes.getOne,
      async ({ params: { id }, query: { withIngredients } }) => {
        const recipes = await this.recipesService.getOne(
          id,
          userId,
          withIngredients,
        );

        return {
          status: 200,
          body: recipes,
        };
      },
    );
  }

  @TsRestHandler(contract.recipes.delete)
  async delete(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.recipes.delete,
      async ({ params: { id } }) => {
        const recipes = await this.recipesService.delete({ id, userId });

        return {
          status: 200,
          body: recipes,
        };
      },
    );
  }

  @TsRestHandler(contract.recipes.update)
  async update() {
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
