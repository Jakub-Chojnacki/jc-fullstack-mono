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

  @TsRestHandler(contract.ingredients.get)
  async get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.ingredients.get, async ({ query }) => {
      const ingredients = await this.ingredientsService.get({ userId, query });

      return {
        status: 200,
        body: ingredients,
      };
    });
  }

  @TsRestHandler(contract.ingredients.delete)
  async delete(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.ingredients.delete,
      async ({ params: { id } }) => {
        const ingredients = await this.ingredientsService.delete({
          id,
          userId,
        });

        return {
          status: 200,
          body: ingredients,
        };
      },
    );
  }

  @TsRestHandler(contract.ingredients.update)
  async updateIngredient(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.ingredients.update,
      async ({ params: { id }, body }) => {
        const ingredients = await this.ingredientsService.update({
          id,
          body,
          userId,
        });

        return {
          status: 200,
          body: ingredients,
        };
      },
    );
  }
}
