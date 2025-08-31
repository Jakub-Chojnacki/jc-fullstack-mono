import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRecordNotFoundError } from 'src/test-utils';
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

  const mockUserId = 123;
  const mockId = 1;

  const mockIngredient = {
    id: mockId,
    name: 'Salt',
    createdAt: new Date(),
    updatedAt: new Date(),
    isGlobal: true,
    userId: mockUserId,
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

  it('should return global ingredients', async () => {
    const mockData = [mockIngredient];

    prisma.ingredient.findMany.mockResolvedValue(mockData);

    const result = await service.get({
      query: { queryFilter: 'GLOBAL' },
      userId: mockData[0].userId,
    });
    expect(result).toEqual(mockData);
    expect(prisma.ingredient.findMany).toHaveBeenCalledWith({
      where: { isGlobal: true },
    });
  });

  it('should return ingredients for a user', async () => {
    const mockData = [mockIngredient];

    prisma.ingredient.findMany.mockResolvedValue(mockData);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER' },
    });
    expect(result).toEqual(mockData);
    expect(prisma.ingredient.findMany).toHaveBeenCalledWith({
      where: { userId: mockUserId },
    });
  });

  it('should create an ingredient for a user', async () => {
    prisma.ingredient.create.mockResolvedValue(mockIngredient);

    const createdIngredientData = {
      name: 'Salt',
      isGlobal: true,
      userId: mockUserId,
    };

    const result = await service.create(createdIngredientData);
    expect(result).toEqual(mockIngredient);
    expect(prisma.ingredient.create).toHaveBeenCalledWith({
      data: createdIngredientData,
    });
  });

  it('should soft delete an ingredient', async () => {
    prisma.ingredient.delete.mockResolvedValue(mockIngredient);

    await service.delete({ id: mockId, userId: mockUserId });

    expect(prisma.ingredient.update).toHaveBeenCalledWith({
      where: { id: mockId, userId: mockUserId },
      data: { isDeleted: true },
    });
  });

  it('should throw PrismaClientKnownRequestError if ingredient not found during delete', async () => {
    const error = createRecordNotFoundError();

    prisma.ingredient.update.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });

  it('should update an ingredient', async () => {
    const updatedIngredientData = { ...mockIngredient, name: 'Apple' };

    prisma.ingredient.update.mockResolvedValue(mockIngredient);

    const result = await service.update({
      id: mockId,
      body: updatedIngredientData,
      userId: mockUserId,
    });
    expect(result).toEqual(mockIngredient);
    expect(prisma.ingredient.update).toHaveBeenCalledWith({
      where: { id: mockId, userId: mockUserId },
      data: updatedIngredientData,
    });
  });

  it('should throw PrismaClientKnownRequestError if ingredient not found during update', async () => {
    const error = createRecordNotFoundError();

    prisma.ingredient.update.mockRejectedValue(error);

    await expect(
      service.update({
        body: { name: 'Updated', isGlobal: false },
        id: 999,
        userId: mockUserId,
      }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
