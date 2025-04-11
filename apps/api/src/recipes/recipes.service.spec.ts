import { TRecipe, TRecipeCreate, TRecipeUpdate } from '@jcmono/api-contract';
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
      createMany: jest.Mock;
    };
    recipeIngredient: {
      createMany: jest.Mock;
      findMany: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      create: jest.Mock;
      deleteMany: jest.Mock;
    };
    $transaction: jest.Mock;
  };

  const mockUserId = 123;
  const mockId = 1;

  type TRecipeWithoutMeta = Omit<TRecipe, 'createdAt' | 'updatedAt'>;

  const mockRecipe: TRecipeWithoutMeta = {
    id: mockId,
    name: 'Pasta',
    description: 'Delicious pasta',
    isGlobal: false,
    userId: mockUserId,
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
              createMany: jest.fn(),
            },
            recipeIngredient: {
              createMany: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              create: jest.fn(),
              deleteMany: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    prisma = module.get(PrismaService);
  });

  it('should return global recipes', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [mockRecipe];

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'GLOBAL' },
    });

    expect(result).toEqual(mockRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        isGlobal: true,
      },
    });
  });

  it('should return recipes for a user', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [mockRecipe];

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER' },
    });

    expect(result).toEqual(mockRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
      },
    });
  });

  it('should create a recipe for a user', async () => {
    prisma.recipe.create.mockResolvedValue(mockRecipe);

    const mockRecipeIngredients: TRecipeCreate['recipeIngredients'] = [
      {
        amount: 100,
        unit: 'GRAMS',
        ingredientId: 1,
        isGlobal: false,
      },
    ];

    const createdRecipeData: Omit<TRecipeCreate, 'recipeIngredients'> = {
      name: 'Pasta',
      description: 'Delicious pasta',
      isGlobal: false,
      userId: mockUserId,
    };

    const result = await service.create({
      recipeIngredients: mockRecipeIngredients,
      ...createdRecipeData,
    });

    expect(result).toEqual(mockRecipe);

    expect(prisma.recipe.create).toHaveBeenCalledWith({
      data: createdRecipeData,
    });
  });

  it('should soft delete a recipe', async () => {
    prisma.recipe.update.mockResolvedValue(mockRecipe);

    const result = await service.delete({ userId: mockUserId, id: mockId });
    expect(result).toEqual(mockRecipe);
  });

  it('should throw TsRestException if recipe not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.recipe.update.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(TsRestException);
  });

  it('should update the recipe and manage ingredients properly', async () => {
    const id = 1;

    const mockRecipeIngredients: TRecipeUpdate['recipeIngredients'] = [
      //First one exists - has id
      {
        id: 10,
        amount: 2,
        unit: 'GRAMS',
        ingredientId: 5,
      },
      //second one does not exist - no id, will be created
      {
        amount: 1,
        unit: 'GRAMS',
        ingredientId: 8,
      },
    ];

    const updateDto: TRecipeCreate = {
      name: 'Updated Recipe Name',
      description: 'Updated description',
      isGlobal: true,
      userId: mockUserId,
      recipeIngredients: mockRecipeIngredients,
    };

    prisma.recipeIngredient.findMany.mockResolvedValue([
      mockRecipeIngredients[0],
      { id: 2, amount: 222, unit: 'GRAMS', ingredientId: 1 },
    ]);

    prisma.recipe.update.mockResolvedValue({
      id,
      name: updateDto.name,
      description: updateDto.description,
      isGlobal: updateDto.isGlobal,
    });

    prisma.$transaction.mockImplementation(async (cb) => cb(prisma as any));

    prisma.recipeIngredient.deleteMany.mockResolvedValue({ count: 1 });
    prisma.recipeIngredient.createMany.mockResolvedValue({ count: 1 });
    prisma.recipeIngredient.update.mockResolvedValue({});

    const result = await service.update(id, updateDto);

    expect(prisma.recipeIngredient.findMany).toHaveBeenCalledWith({
      where: { recipeId: id },
      select: { id: true },
    });

    expect(prisma.recipeIngredient.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: [2] } },
    });

    expect(prisma.recipe.update).toHaveBeenCalledWith({
      where: { id },
      data: {
        name: updateDto.name,
        description: updateDto.description,
        isGlobal: updateDto.isGlobal,
        userId: mockUserId,
      },
    });

    expect(prisma.recipeIngredient.createMany).toHaveBeenCalledWith({
      data: [
        {
          amount: 1,
          unit: 'GRAMS',
          ingredientId: 8,
          recipeId: id,
        },
      ],
    });

    expect(prisma.recipeIngredient.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: mockRecipeIngredients[0],
    });

    expect(result).toMatchObject({
      id,
      name: updateDto.name,
      description: updateDto.description,
      isGlobal: updateDto.isGlobal,
    });
  });

  it('should throw TsRestException if recipe not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.recipe.update.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(TsRestException);
  });
});
