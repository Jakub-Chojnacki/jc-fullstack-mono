import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleMealsController } from './schedule-meals.controller';
import { ScheduleMealsService } from './schedule-meals.service';

describe('ScheduleMealsController', () => {
  let controller: ScheduleMealsController;

  const mockScheduleMealsService = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleMealsController],
      providers: [
        {
          provide: ScheduleMealsService,
          useValue: mockScheduleMealsService,
        },
      ],
    }).compile();

    controller = module.get<ScheduleMealsController>(ScheduleMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
