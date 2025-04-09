import { TShoppingListIngredientCreate } from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { TsRestException } from '@ts-rest/nest';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListIngredientsService } from './shopping-list-ingredients.service';

describe('ShoppingListIngredientsService', () => {
  let service: ShoppingListIngredientsService;

  const userId = 1;
  const mockData: TShoppingListIngredientCreate & { userId: number } = {
    ingredientId: 1,
    amount: 100,
    isDone: false,
    unit: 'GRAMS',
    userId: 1,
  };

  let prisma: {
    shoppingListIngredient: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
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

    const result = await service.update(1, mockIngredientIsDone, userId);
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
      service.update(
        999,
        {
          ...mockData,
          isDone: true,
        },
        userId,
      ),
    ).rejects.toThrow(TsRestException);
  });
});
