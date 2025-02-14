import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientsService } from './recipe-ingredients.service';

describe('RecipeIngredientsService', () => {
  let service: RecipeIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeIngredientsService],
    }).compile();

    service = module.get<RecipeIngredientsService>(RecipeIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
