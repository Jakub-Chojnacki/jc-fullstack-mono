import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { IngredientsService } from './ingredients.service';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @TsRestHandler(contract.ingredients.create)
  async create() {
    return tsRestHandler(contract.ingredients.create, async ({ body }) => {
      const createdIngredient = await this.ingredientsService.create(body);

      return {
        status: 201,
        body: createdIngredient,
      };
    });
  }

  @TsRestHandler(contract.ingredients.getForUser)
  async getForUser() {
    return tsRestHandler(
      contract.ingredients.getForUser,
      async ({ params }) => {
        const { userId } = params;
        const ingredients = await this.ingredientsService.getForUser(userId);

        return {
          status: 200,
          body: ingredients,
        };
      },
    );
  }

  @TsRestHandler(contract.ingredients.getAll)
  async getOneIngredient() {
    return tsRestHandler(contract.ingredients.getAll, async () => {
      const ingredients = await this.ingredientsService.getAll();

      if (!ingredients)
        return {
          status: 404,
          body: { message: 'Ingredients not found!' },
        };

      return {
        status: 200,
        body: ingredients,
      };
    });
  }
}
