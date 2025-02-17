import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleMealsService } from './schedule-meals.service';

describe('ScheduleMealsService', () => {
  let service: ScheduleMealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleMealsService],
    }).compile();

    service = module.get<ScheduleMealsService>(ScheduleMealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
