import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TRecipeIngredientCreate } from '@jcmono/api-contract';
import { TsRestException } from '@ts-rest/nest';

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

  it('should throw TsRestException when updating a non-existing recipe ingredient', async () => {
    const error = { code: 'P2025' };

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
    ).rejects.toThrow(TsRestException);
  });

  it('should delete a recipe ingredient', async () => {
    prisma.recipeIngredient.delete.mockResolvedValue(mockData);

    const result = await service.delete({ id: 1 });
    expect(result).toEqual(mockData);

    expect(prisma.recipeIngredient.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw TsRestException when deleting a non-existing recipe ingredient', async () => {
    const error = { code: 'P2025' };

    prisma.recipeIngredient.delete.mockRejectedValue(error);

    await expect(service.delete({ id: 999 })).rejects.toThrow(TsRestException);
  });
});
