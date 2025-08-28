import {
  MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
  TShoppingListIngredientCreate,
} from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { TsRestException } from '@ts-rest/nest';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsService', () => {
  let service: ShoppingListIngredientsService;

  const userId = 123;

  const mockRecipe = {
    id: 1,
    name: 'Test Recipe',
    recipeIngredients: [
      {
        ingredientId: 1,
        amount: 100,
        unit: 'GRAMS',
      },
      {
        ingredientId: 2,
        amount: 50,
        unit: 'GRAMS',
      },
    ],
  };

  const mockDataFromRecipe: (TShoppingListIngredientCreate & {
    userId: number;
  })[] = [
    {
      ingredientId: 1,
      amount: 100,
      isDone: false,
      isDeleted: false,
      unit: 'GRAMS',
      userId,
    },
    {
      ingredientId: 2,
      amount: 50,
      isDone: false,
      isDeleted: false,
      unit: 'GRAMS',
      userId,
    },
  ];

  const mockData: TShoppingListIngredientCreate & { userId: number } = {
    ingredientId: 1,
    amount: 100,
    isDone: false,
    isDeleted: false,
    unit: 'GRAMS',
    userId,
  };

  const getExpectedLimitErrorMessage = (
    currentCount: number,
    ingredientsToAdd: number = 1,
  ) =>
    `Maximum of ${MAXIMUM_SAVED_SHOPPING_LIST_ITEMS} ingredients reached. Adding this ingredient would make it ${currentCount + ingredientsToAdd}.`;

  let prisma: {
    shoppingListIngredient: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      createManyAndReturn: jest.Mock;
      count: jest.Mock;
    };
    recipe: {
      findUnique: jest.Mock;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingListIngredientsService,
        {
          provide: PrismaService,
          useValue: {
            shoppingListIngredient: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              createManyAndReturn: jest.fn(),
              count: jest.fn(),
            },
            recipe: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingListIngredientsService>(
      ShoppingListIngredientsService,
    );
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a shopping list ingredient', async () => {
    prisma.shoppingListIngredient.create.mockResolvedValue(mockData);

    const result = await service.create(mockData, userId);
    expect(result).toEqual(mockData);

    expect(prisma.shoppingListIngredient.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('should create multiple shopping list ingredients from recipeId', async () => {
    prisma.shoppingListIngredient.createManyAndReturn.mockResolvedValue(
      mockDataFromRecipe,
    );

    prisma.recipe.findUnique.mockResolvedValue(mockRecipe);

    const result = await service.createFromRecipe(mockRecipe.id, userId);

    expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockRecipe.id,
      },
      select: {
        recipeIngredients: {
          select: {
            amount: true,
            unit: true,
            ingredientId: true,
          },
        },
      },
    });

    expect(
      prisma.shoppingListIngredient.createManyAndReturn,
    ).toHaveBeenCalledWith({
      data: mockDataFromRecipe,
    });

    expect(result).toEqual(mockDataFromRecipe);
  });

  it('should delete a shopping list ingredient', async () => {
    prisma.shoppingListIngredient.delete.mockResolvedValue({ id: 1 });

    await service.delete(1, userId);

    expect(prisma.shoppingListIngredient.update).toHaveBeenCalledWith({
      where: {
        id: 1,
        userId,
      },
      data: {
        isDeleted: true,
      },
    });
  });

  it('should throw TsRestException if not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.shoppingListIngredient.update.mockRejectedValue(error);

    await expect(service.delete(999, userId)).rejects.toThrow(TsRestException);
  });

  it('should update a shopping list ingredient', async () => {
    const mockIngredientIsDone = {
      ...mockData,
      isDone: true,
    };

    prisma.shoppingListIngredient.update.mockResolvedValue(
      mockIngredientIsDone,
    );

    const result = await service.update({
      id: 1,
      data: mockIngredientIsDone,
      userId,
    });
    expect(result).toEqual(mockIngredientIsDone);

    expect(prisma.shoppingListIngredient.update).toHaveBeenCalledWith({
      where: {
        id: 1,
        userId,
      },
      data: mockIngredientIsDone,
    });
  });

  it('should throw TsRestException if not found during update', async () => {
    const error = { code: 'P2025' };

    prisma.shoppingListIngredient.update.mockRejectedValue(error);

    await expect(
      service.update({
        id: 999,
        data: {
          ...mockData,
          isDone: true,
        },
        userId,
      }),
    ).rejects.toThrow(TsRestException);
  });

  describe('ingredient limit tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should allow creating an ingredient when exactly at the limit would result in maximum', async () => {
      prisma.shoppingListIngredient.count.mockResolvedValue(
        MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 1,
      );
      prisma.shoppingListIngredient.create.mockResolvedValue(mockData);

      const result = await service.create(mockData, userId);

      expect(result).toEqual(mockData);
      expect(prisma.shoppingListIngredient.create).toHaveBeenCalledWith({
        data: mockData,
      });
    });

    it('should throw error when trying to create an ingredient at the limit', async () => {
      prisma.shoppingListIngredient.count.mockResolvedValue(
        MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
      );

      await expect(service.create(mockData, userId)).rejects.toThrow(
        getExpectedLimitErrorMessage(MAXIMUM_SAVED_SHOPPING_LIST_ITEMS),
      );

      expect(prisma.shoppingListIngredient.count).toHaveBeenCalledWith({
        where: {
          userId,
          isDeleted: false,
        },
      });
      expect(prisma.shoppingListIngredient.create).not.toHaveBeenCalled();
    });

    it('should throw error when trying to create an ingredient over the limit', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS;
      prisma.shoppingListIngredient.count.mockResolvedValue(currentCount);

      await expect(service.create(mockData, userId)).rejects.toThrow(
        getExpectedLimitErrorMessage(currentCount),
      );
    });

    it('should allow creating multiple ingredients from recipe when under the limit', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 3;
      prisma.shoppingListIngredient.count.mockResolvedValue(currentCount);
      prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
      prisma.shoppingListIngredient.createManyAndReturn.mockResolvedValue(
        mockDataFromRecipe,
      );

      const result = await service.createFromRecipe(mockRecipe.id, userId);

      expect(prisma.shoppingListIngredient.count).toHaveBeenCalledWith({
        where: {
          userId,
          isDeleted: false,
        },
      });
      expect(result).toEqual(mockDataFromRecipe);
    });

    it('should throw error when creating multiple ingredients from recipe would exceed the limit', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 1;
      prisma.shoppingListIngredient.count.mockResolvedValue(currentCount);
      prisma.recipe.findUnique.mockResolvedValue(mockRecipe);

      await expect(
        service.createFromRecipe(mockRecipe.id, userId),
      ).rejects.toThrow(
        getExpectedLimitErrorMessage(
          currentCount,
          mockRecipe.recipeIngredients.length,
        ),
      );

      expect(prisma.shoppingListIngredient.count).toHaveBeenCalledWith({
        where: {
          userId,
          isDeleted: false,
        },
      });
      expect(
        prisma.shoppingListIngredient.createManyAndReturn,
      ).not.toHaveBeenCalled();
    });

    it('should handle exact limit scenario for createFromRecipe', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 2;
      prisma.shoppingListIngredient.count.mockResolvedValue(currentCount);
      prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
      prisma.shoppingListIngredient.createManyAndReturn.mockResolvedValue(
        mockDataFromRecipe,
      );

      const result = await service.createFromRecipe(mockRecipe.id, userId);

      expect(result).toEqual(mockDataFromRecipe);
      expect(
        prisma.shoppingListIngredient.createManyAndReturn,
      ).toHaveBeenCalledWith({
        data: mockDataFromRecipe,
      });
    });
  });
});
