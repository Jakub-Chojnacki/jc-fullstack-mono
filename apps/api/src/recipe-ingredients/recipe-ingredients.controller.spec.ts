import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { RecipeIngredientsService } from './recipe-ingredients.service';

describe('RecipeIngredientsController', () => {
  let controller: RecipeIngredientsController;

  const mockRecipeIngredientsService = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeIngredientsController],
      providers: [
        {
          provide: RecipeIngredientsService,
          useValue: mockRecipeIngredientsService,
        },
      ],
    }).compile();

    controller = module.get<RecipeIngredientsController>(
      RecipeIngredientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
