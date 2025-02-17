import { Module } from '@nestjs/common';
import { ScheduleMealsService } from './schedule-meals.service';
import { ScheduleMealsController } from './schedule-meals.controller';

@Module({
  controllers: [ScheduleMealsController],
  providers: [ScheduleMealsService],
})
export class ScheduleMealsModule {}
