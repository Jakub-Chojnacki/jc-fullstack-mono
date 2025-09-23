import {
  MAXIMUM_SAVED_SHOPPING_LIST_ITEMS,
  TShoppingListIngredientCreate,
} from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRecordNotFoundError } from 'src/test-utils';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsService', () => {
  let service: ShoppingListIngredientsService;

  const userId = 'random-id';

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
    userId: string;
  })[] = [
    {
      ingredientId: 1,
      amount: 100,
      isDone: false,
      unit: 'GRAMS',
      userId,
    },
    {
      ingredientId: 2,
      amount: 50,
      isDone: false,
      unit: 'GRAMS',
      userId,
    },
  ];

  const mockData: TShoppingListIngredientCreate & { userId: string } = {
    ingredientId: 1,
    amount: 100,
    isDone: false,
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
      findFirst: jest.Mock;
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
              findFirst: jest.fn(),
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

  it('should create a shopping list ingredient when it does not exist', async () => {
    prisma.shoppingListIngredient.findFirst.mockResolvedValue(null);
    prisma.shoppingListIngredient.create.mockResolvedValue(mockData);

    const result = await service.create(mockData, userId);
    expect(result).toEqual(mockData);

    expect(prisma.shoppingListIngredient.findFirst).toHaveBeenCalledWith({
      where: {
        userId,
        ingredientId: mockData.ingredientId,
        unit: mockData.unit,
      },
    });

    expect(prisma.shoppingListIngredient.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('should add to existing shopping list ingredient when it already exists', async () => {
    const existingIngredient = {
      ...mockData,
      id: 1,
      amount: 50,
    };

    const updatedIngredient = {
      ...existingIngredient,
      amount: 150, // 50 + 100
    };

    prisma.shoppingListIngredient.findFirst.mockResolvedValue(
      existingIngredient,
    );
    prisma.shoppingListIngredient.update.mockResolvedValue(updatedIngredient);

    const result = await service.create(mockData, userId);
    expect(result).toEqual(updatedIngredient);

    expect(prisma.shoppingListIngredient.findFirst).toHaveBeenCalledWith({
      where: {
        userId,
        ingredientId: mockData.ingredientId,
        unit: mockData.unit,
      },
    });

    expect(prisma.shoppingListIngredient.update).toHaveBeenCalledWith({
      where: {
        id: existingIngredient.id,
      },
      data: {
        amount: 150, // existing 50 + new 100
        isDone: false,
      },
    });
  });

  it('should create shopping list ingredients from recipe when none exist', async () => {
    prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
    prisma.shoppingListIngredient.findFirst.mockResolvedValue(null);
    prisma.shoppingListIngredient.create
      .mockResolvedValueOnce(mockDataFromRecipe[0])
      .mockResolvedValueOnce(mockDataFromRecipe[1]);

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

    expect(prisma.shoppingListIngredient.findFirst).toHaveBeenCalledTimes(2);

    expect(prisma.shoppingListIngredient.create).toHaveBeenCalledTimes(2);
    expect(prisma.shoppingListIngredient.create).toHaveBeenNthCalledWith(1, {
      data: {
        ingredientId: 1,
        amount: 100,
        unit: 'GRAMS',
        userId,
        isDone: false,
      },
    });
    expect(prisma.shoppingListIngredient.create).toHaveBeenNthCalledWith(2, {
      data: {
        ingredientId: 2,
        amount: 50,
        unit: 'GRAMS',
        userId,
        isDone: false,
      },
    });

    expect(result).toEqual(mockDataFromRecipe);
  });

  it('should delete a shopping list ingredient', async () => {
    prisma.shoppingListIngredient.delete.mockResolvedValue({ id: 1 });

    await service.delete(1, userId);

    expect(prisma.shoppingListIngredient.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
        userId,
      },
    });
  });

  it('should throw PrismaClientKnownRequestError if not found during delete', async () => {
    const error = createRecordNotFoundError();

    prisma.shoppingListIngredient.delete.mockRejectedValue(error);

    await expect(service.delete(999, userId)).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
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

  it('should throw PrismaClientKnownRequestError if not found during update', async () => {
    const error = createRecordNotFoundError();

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
    ).rejects.toThrow(PrismaClientKnownRequestError);
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
      prisma.shoppingListIngredient.findFirst.mockResolvedValue(null);
      prisma.shoppingListIngredient.create
        .mockResolvedValueOnce(mockDataFromRecipe[0])
        .mockResolvedValueOnce(mockDataFromRecipe[1]);

      const result = await service.createFromRecipe(mockRecipe.id, userId);

      expect(prisma.shoppingListIngredient.count).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockDataFromRecipe);
    });

    it('should throw error when creating multiple ingredients from recipe would exceed the limit', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 1;
      prisma.shoppingListIngredient.count
        .mockResolvedValueOnce(currentCount) // First ingredient check - should pass
        .mockResolvedValueOnce(currentCount + 1); // Second ingredient check - should fail
      prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
      prisma.shoppingListIngredient.findFirst
        .mockResolvedValueOnce(null) // First ingredient doesn't exist
        .mockResolvedValueOnce(null); // Second ingredient doesn't exist
      prisma.shoppingListIngredient.create.mockResolvedValueOnce(
        mockDataFromRecipe[0],
      ); // First ingredient created successfully

      await expect(
        service.createFromRecipe(mockRecipe.id, userId),
      ).rejects.toThrow(getExpectedLimitErrorMessage(currentCount + 1, 1));

      expect(prisma.shoppingListIngredient.count).toHaveBeenCalledTimes(2);
      expect(prisma.shoppingListIngredient.create).toHaveBeenCalledTimes(1);
    });

    it('should handle exact limit scenario for createFromRecipe', async () => {
      const currentCount = MAXIMUM_SAVED_SHOPPING_LIST_ITEMS - 2;
      prisma.shoppingListIngredient.count.mockResolvedValue(currentCount);
      prisma.recipe.findUnique.mockResolvedValue(mockRecipe);
      prisma.shoppingListIngredient.findFirst.mockResolvedValue(null);
      prisma.shoppingListIngredient.create
        .mockResolvedValueOnce(mockDataFromRecipe[0])
        .mockResolvedValueOnce(mockDataFromRecipe[1]);

      const result = await service.createFromRecipe(mockRecipe.id, userId);

      expect(result).toEqual(mockDataFromRecipe);
      expect(prisma.shoppingListIngredient.create).toHaveBeenCalledTimes(2);
    });
  });
});
