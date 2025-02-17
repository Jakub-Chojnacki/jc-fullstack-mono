import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleMealsController } from './schedule-meals.controller';
import { ScheduleMealsService } from './schedule-meals.service';

describe('ScheduleMealsController', () => {
  let controller: ScheduleMealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleMealsController],
      providers: [ScheduleMealsService],
    }).compile();

    controller = module.get<ScheduleMealsController>(ScheduleMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
