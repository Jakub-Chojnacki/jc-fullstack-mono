import { TRecipe } from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { TsRestException } from '@ts-rest/nest';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;

  let prisma: {
    recipe: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockRecipe: TRecipe = {
    id: 1,
    name: 'Pasta',
    description: 'Delicious pasta',
    createdAt: new Date(),
    updatedAt: new Date(),
    isGlobal: false,
    userId: 123,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: PrismaService,
          useValue: {
            recipe: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    prisma = module.get(PrismaService);
  });

  it('should return global recipes', async () => {
    const mockRecipes: TRecipe[] = [mockRecipe];

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);

    const result = await service.getGlobal();

    expect(result).toEqual(mockRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        isGlobal: true,
      },
    });
  });

  it('should return recipes for a user', async () => {
    const mockRecipes: TRecipe[] = [mockRecipe];

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);

    const result = await service.getForUser(123);
    expect(result).toEqual(mockRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: 123,
      },
    });
  });

  it('should create a recipe for a user', async () => {
    prisma.recipe.create.mockResolvedValue(mockRecipe);

    const createdRecipeData = {
      name: 'Pasta',
      description: 'Delicious pasta',
      isGlobal: false,
      userId: 123,
    };

    const result = await service.create(createdRecipeData);
    expect(result).toEqual(mockRecipe);
    expect(prisma.recipe.create).toHaveBeenCalledWith({
      data: createdRecipeData,
    });
  });

  it('should delete a recipe', async () => {
    prisma.recipe.delete.mockResolvedValue(mockRecipe);

    const result = await service.delete(1);
    expect(result).toEqual(mockRecipe);
  });

  it('should throw TsRestException if recipe not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.recipe.delete.mockRejectedValue(error);

    await expect(service.delete(999)).rejects.toThrow(TsRestException);
  });

  it('should update a recipe', async () => {
    prisma.recipe.update.mockResolvedValue(mockRecipe);

    const updatedRecipeData = {
      name: 'Pizza',
      description: 'Pizza is better than pasta',
      isGlobal: false,
      userId: 123,
    };

    const result = await service.update(1, updatedRecipeData);
    expect(result).toEqual(mockRecipe);
    expect(prisma.recipe.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: updatedRecipeData,
    });
  });

  it('should throw TsRestException if recipe not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.recipe.delete.mockRejectedValue(error);

    await expect(service.delete(999)).rejects.toThrow(TsRestException);
  });
});
