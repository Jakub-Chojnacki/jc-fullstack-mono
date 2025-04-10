import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListIngredientsController } from './shopping-list-ingredients.controller';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsController', () => {
  let controller: ShoppingListIngredientsController;

  const mockShoppingListIngredientService = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListIngredientsController],
      providers: [
        {
          provide: ShoppingListIngredientsService,
          useValue: mockShoppingListIngredientService,
        },
      ],
    }).compile();

    controller = module.get<ShoppingListIngredientsController>(
      ShoppingListIngredientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
