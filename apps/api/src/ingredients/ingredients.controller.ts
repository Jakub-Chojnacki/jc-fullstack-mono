import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@jcmono/api-contract';

import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @TsRestHandler(contract.ingredients)
  async handler() {
    return tsRestHandler(contract.ingredients, {
      create: async ({ body }) => {
        return this.ingredientsService.create(body);
      },
    });
  }
}
