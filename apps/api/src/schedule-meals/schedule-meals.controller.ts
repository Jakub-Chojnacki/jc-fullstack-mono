import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { ScheduleMealsService } from './schedule-meals.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller()
export class ScheduleMealsController {
  constructor(private readonly scheduleMealsService: ScheduleMealsService) {}

  @TsRestHandler(contract.scheduleMeals.create)
  async create(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.scheduleMeals.create, async ({ body }) => {
      const createdScheduledMeal = await this.scheduleMealsService.create(
        userId,
        body,
      );

      return {
        status: 201,
        body: createdScheduledMeal,
      };
    });
  }

  @TsRestHandler(contract.scheduleMeals.update)
  async update() {
    return tsRestHandler(
      contract.scheduleMeals.update,
      async ({ params: { id }, body }) => {
        const scheduledMeal = await this.scheduleMealsService.update(id, body);

        return {
          status: 200,
          body: scheduledMeal,
        };
      },
    );
  }

  @TsRestHandler(contract.scheduleMeals.delete)
  async delete() {
    return tsRestHandler(
      contract.scheduleMeals.delete,
      async ({ params: { id } }) => {
        const deletedSchedule = await this.scheduleMealsService.delete(id);

        return {
          status: 200,
          body: deletedSchedule,
        };
      },
    );
  }

  @TsRestHandler(contract.scheduleMeals.get)
  async get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.scheduleMeals.get, async ({ query }) => {
      const scheduledMeals = await this.scheduleMealsService.get({
        userId,
        ...query,
      });

      return {
        status: 200,
        body: scheduledMeals,
      };
    });
  }

  @TsRestHandler(contract.scheduleMeals.getById)
  async getById(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.scheduleMeals.getById,
      async ({ params: { id } }) => {
        const scheduledMeal = await this.scheduleMealsService.getById(
          userId,
          id,
        );

        if (!scheduledMeal) {
          return {
            status: 404,
            body: { message: 'Scheduled meal not found' },
          };
        }

        return {
          status: 200,
          body: scheduledMeal,
        };
      },
    );
  }
}
