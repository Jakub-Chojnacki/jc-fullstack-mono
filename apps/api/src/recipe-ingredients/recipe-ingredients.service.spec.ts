import { TRecipeIngredientCreate } from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRecordNotFoundError } from 'src/test-utils';
import { RecipeIngredientsService } from './recipe-ingredients.service';

describe('RecipeIngredientsService', () => {
  let service: RecipeIngredientsService;

  let prisma: {
    recipeIngredient: {
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockData: TRecipeIngredientCreate = {
    amount: 200,
    recipeId: 1,
    ingredientId: 1,
    isGlobal: false,
    unit: 'GRAMS',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeIngredientsService,
        {
          provide: PrismaService,
          useValue: {
            recipeIngredient: {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RecipeIngredientsService>(RecipeIngredientsService);
    prisma = module.get(PrismaService);
  });

  it('should create a recipe ingredient', async () => {
    prisma.recipeIngredient.create.mockResolvedValue(mockData);

    const result = await service.create(mockData);
    expect(result).toEqual(mockData);

    expect(prisma.recipeIngredient.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('should update a recipe ingredient', async () => {
    prisma.recipeIngredient.update.mockResolvedValue(mockData);

    const result = await service.update({ id: 1, body: mockData });
    expect(result).toEqual(mockData);

    expect(prisma.recipeIngredient.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockData,
    });
  });

  it('should throw PrismaClientKnownRequestError when updating a non-existing recipe ingredient', async () => {
    const error = createRecordNotFoundError();

    prisma.recipeIngredient.update.mockRejectedValue(error);

    await expect(
      service.update({
        id: 999,
        body: {
          amount: 150,
          recipeId: 1,
          ingredientId: 1,
          isGlobal: false,
          unit: 'GRAMS',
        },
      }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });

  it('should delete a recipe ingredient', async () => {
    prisma.recipeIngredient.delete.mockResolvedValue(mockData);

    const result = await service.delete({ id: 1 });
    expect(result).toEqual(mockData);

    expect(prisma.recipeIngredient.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw PrismaClientKnownRequestError when deleting a non-existing recipe ingredient', async () => {
    const error = createRecordNotFoundError('Record to delete does not exist.');

    prisma.recipeIngredient.delete.mockRejectedValue(error);

    await expect(service.delete({ id: 999 })).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
  });
});
