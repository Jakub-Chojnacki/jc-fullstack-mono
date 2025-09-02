import { contract, EMealTypes } from '@jcmono/api-contract';
import { Controller, NotFoundException } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { GetCurrentUserId } from 'src/common/decorators';
import { ScheduleMealsService } from './schedule-meals.service';

@Controller()
export class ScheduleMealsController {
  constructor(private readonly scheduleMealsService: ScheduleMealsService) {}

  @TsRestHandler(contract.scheduleMeals.create)
  create(@GetCurrentUserId() userId: number) {
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
  update() {
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
  delete(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.scheduleMeals.delete,
      async ({ params: { id } }) => {
        const deletedSchedule = await this.scheduleMealsService.delete({
          id,
          userId,
        });

        return {
          status: 200,
          body: deletedSchedule,
        };
      },
    );
  }

  @TsRestHandler(contract.scheduleMeals.get)
  get(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.scheduleMeals.get, async ({ query }) => {
      const scheduledMeals = await this.scheduleMealsService.get({
        userId,
        ...query,
      });

      // Cast Prisma MealType to EMealTypes
      const transformedMeals = scheduledMeals.map((meal) => ({
        ...meal,
        recipe: {
          ...meal.recipe,
          mealTypes: meal.recipe.mealTypes as unknown as EMealTypes[],
        },
      }));

      return {
        status: 200,
        body: transformedMeals,
      };
    });
  }

  @TsRestHandler(contract.scheduleMeals.getById)
  getById(@GetCurrentUserId() userId: number) {
    return tsRestHandler(
      contract.scheduleMeals.getById,
      async ({ params: { id } }) => {
        const scheduledMeal = await this.scheduleMealsService.getById(
          userId,
          id,
        );

        if (!scheduledMeal) {
          throw new NotFoundException('Scheduled meal not found');
        }

        // Cast Prisma MealType to EMealTypes
        const transformedMeal = {
          ...scheduledMeal,
          recipe: {
            ...scheduledMeal.recipe,
            mealTypes: scheduledMeal.recipe
              .mealTypes as unknown as EMealTypes[],
          },
        };

        return {
          status: 200,
          body: transformedMeal,
        };
      },
    );
  }
}
