import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsService', () => {
  let service: ShoppingListIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListIngredientsService],
    }).compile();

    service = module.get<ShoppingListIngredientsService>(ShoppingListIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
