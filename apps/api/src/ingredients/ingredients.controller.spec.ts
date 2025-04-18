import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

describe('IngredientsController', () => {
  let controller: IngredientsController;

  const mockIngredientsService = {
    create: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [
        {
          provide: IngredientsService,
          useValue: mockIngredientsService,
        },
      ],
    }).compile();

    controller = module.get<IngredientsController>(IngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
