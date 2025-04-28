import { TShoppingListIngredientCreate } from '@jcmono/api-contract';
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

  let prisma: {
    shoppingListIngredient: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      createManyAndReturn: jest.Mock;
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
            id: true,
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
});
