import { contract } from '@jcmono/api-contract';
import { Controller, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { AuthGuard, Session, UserSession } from '@mguay/nestjs-better-auth';
import { GetCurrentUserId } from 'src/common/decorators';
import { IngredientsService } from './ingredients.service';

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(AuthGuard)
  @TsRestHandler(contract.ingredients.create)
  create(@Session() session: UserSession) {
    return tsRestHandler(contract.ingredients.create, async ({ body }) => {
      const createdIngredient = await this.ingredientsService.create({
        ...body,
        userId: session.user.id || '',
      });

      return {
        status: 201,
        body: createdIngredient,
      };
    });
  }

  @TsRestHandler(contract.ingredients.get)
  get(@GetCurrentUserId() userId: string) {
    return tsRestHandler(contract.ingredients.get, async ({ query }) => {
      const ingredients = await this.ingredientsService.get({ userId, query });

      return {
        status: 200,
        body: ingredients,
      };
    });
  }

  @TsRestHandler(contract.ingredients.delete)
  delete(@GetCurrentUserId() userId: string) {
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
  updateIngredient(@GetCurrentUserId() userId: string) {
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
