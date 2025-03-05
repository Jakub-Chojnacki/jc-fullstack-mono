import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListIngredientsController } from './shopping-list-ingredients.controller';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsController', () => {
  let controller: ShoppingListIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListIngredientsController],
      providers: [ShoppingListIngredientsService],
    }).compile();

    controller = module.get<ShoppingListIngredientsController>(ShoppingListIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
