import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListService } from './shopping-list.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TsRestException } from '@ts-rest/nest';
import { TShoppingListCreate } from '@jcmono/api-contract';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  const mockData: TShoppingListCreate = {
    userId: 1,
  };

  let prisma: {
    shoppingList: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingListService,
        {
          provide: PrismaService,
          useValue: {
            shoppingList: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingListService>(ShoppingListService);
    prisma = module.get(PrismaService);
  });

  it('should create a shopping list', async () => {
    prisma.shoppingList.create.mockResolvedValue(mockData);

    const result = await service.create(mockData);
    expect(result).toEqual({ ...mockData, ingredients: [] });

    expect(prisma.shoppingList.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('should delete a shopping list', async () => {
    prisma.shoppingList.delete.mockResolvedValue({ id: 1 });

    const result = await service.delete(1);
    expect(result).toEqual({ id: 1 });

    expect(prisma.shoppingList.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw TsRestException if not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.shoppingList.delete.mockRejectedValue(error);

    await expect(service.delete(999)).rejects.toThrow(TsRestException);
  });

  it('should get shopping lists for a user', async () => {
    prisma.shoppingList.findMany.mockResolvedValue([mockData]);

    const result = await service.get(1);
    expect(result).toEqual([mockData]);

    expect(prisma.shoppingList.findMany).toHaveBeenCalledWith({
      where: {
        userId: 1,
      },
      include: {
        ingredients: true,
      },
    });
  });
});
