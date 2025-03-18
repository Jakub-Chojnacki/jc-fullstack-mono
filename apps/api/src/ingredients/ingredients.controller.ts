import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { IngredientsService } from './ingredients.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @TsRestHandler(contract.ingredients.create)
  async create(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.ingredients.create, async ({ body }) => {
      const createdIngredient = await this.ingredientsService.create({
        ...body,
        userId,
      });

      return {
        status: 201,
        body: createdIngredient,
      };
    });
  }

  @TsRestHandler(contract.ingredients.getForUser)
  async getForUser(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.ingredients.getForUser, async () => {
      const ingredients = await this.ingredientsService.getForUser(userId);

      return {
        status: 200,
        body: ingredients,
      };
    });
  }

  @TsRestHandler(contract.ingredients.getGlobal)
  async getGlobalIngredients() {
    return tsRestHandler(contract.ingredients.getGlobal, async () => {
      const ingredients = await this.ingredientsService.getGlobal();

      return {
        status: 200,
        body: ingredients,
      };
    });
  }

  @TsRestHandler(contract.ingredients.delete)
  async deleteIngredient() {
    return tsRestHandler(
      contract.ingredients.delete,
      async ({ params: { id } }) => {
        const ingredients = await this.ingredientsService.delete(id);

        return {
          status: 200,
          body: ingredients,
        };
      },
    );
  }

  @TsRestHandler(contract.ingredients.update)
  async updateIngredient() {
    return tsRestHandler(
      contract.ingredients.update,
      async ({ params: { id }, body }) => {
        const ingredients = await this.ingredientsService.update(id, body);

        return {
          status: 200,
          body: ingredients,
        };
      },
    );
  }
}
