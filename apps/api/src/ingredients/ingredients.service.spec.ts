import { Test, TestingModule } from '@nestjs/testing';
import { TsRestException } from '@ts-rest/nest';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientsService } from './ingredients.service';

describe('IngredientsService', () => {
  let service: IngredientsService;

  let prisma: {
    ingredient: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockIngredient = {
    id: 1,
    name: 'Salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    isGlobal: true,
    userId: 123,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsService,
        {
          provide: PrismaService,
          useValue: {
            ingredient: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
    prisma = module.get(PrismaService);
  });

  it("should return global ingredients", async () => {
    const mockData = [mockIngredient];

    prisma.ingredient.findMany.mockResolvedValue(mockData);

    const result = await service.getGlobal();
    expect(result).toEqual(mockData);
    expect(prisma.ingredient.findMany).toHaveBeenCalledWith({
      where: { isGlobal: true },
    });
  })

  it('should return ingredients for a user', async () => {
    const mockData = [mockIngredient];

    prisma.ingredient.findMany.mockResolvedValue(mockData);

    const result = await service.getForUser(123);
    expect(result).toEqual(mockData);
    expect(prisma.ingredient.findMany).toHaveBeenCalledWith({
      where: { userId: 123 },
    });
  });

  it('should create an ingredient for a user', async () => {
    prisma.ingredient.create.mockResolvedValue(mockIngredient);

    const createdIngredientData = { name: 'Salt', isGlobal: true, userId: 123 };

    const result = await service.create(createdIngredientData);
    expect(result).toEqual(mockIngredient);
    expect(prisma.ingredient.create).toHaveBeenCalledWith({
      data: createdIngredientData,
    });
  });

  it('should delete an ingredient', async () => {
    prisma.ingredient.delete.mockResolvedValue(mockIngredient);

    const result = await service.delete(1);
    expect(result).toEqual(mockIngredient);
    expect(prisma.ingredient.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw TsRestException if ingredient not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.ingredient.delete.mockRejectedValue(error);

    await expect(service.delete(999)).rejects.toThrow(TsRestException);
  });

  it('should update an ingredient', async () => {
    const updatedIngredientData = { ...mockIngredient, name: 'Apple' };

    prisma.ingredient.update.mockResolvedValue(mockIngredient);

    const result = await service.update(1, updatedIngredientData);
    expect(result).toEqual(mockIngredient);
    expect(prisma.ingredient.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedIngredientData,
    });
  });

  it('should throw TsRestException if ingredient not found during update', async () => {
    const error = { code: 'P2025' };

    prisma.ingredient.update.mockRejectedValue(error);

    await expect(
      service.update(999, { name: 'Updated', isGlobal: false }),
    ).rejects.toThrow(TsRestException);
  });
});
