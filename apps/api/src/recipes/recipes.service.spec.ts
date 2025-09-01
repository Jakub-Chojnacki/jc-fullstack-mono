import { TRecipe, TRecipeCreate, TRecipeUpdate } from '@jcmono/api-contract';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRecordNotFoundError } from 'src/test-utils';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;

  let prisma: {
    recipe: {
      findMany: jest.Mock;
      count: jest.Mock;
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
              count: jest.fn(),
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
    const mockCount = 1;

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);
    prisma.recipe.count.mockResolvedValue(mockCount);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'GLOBAL', page: '1', take: '10' },
    });

    expect(result.data).toEqual(mockRecipes);
    expect(result.pagination.totalCount).toBe(mockCount);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        isGlobal: true,
      },
      skip: 0,
      take: 10,
    });
    expect(prisma.recipe.count).toHaveBeenCalledWith({
      where: {
        isGlobal: true,
      },
    });
  });

  it('should return recipes for a user', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [mockRecipe];
    const mockCount = 1;

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);
    prisma.recipe.count.mockResolvedValue(mockCount);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER', page: '1', take: '10' },
    });

    expect(result.data).toEqual(mockRecipes);
    expect(result.pagination.totalCount).toBe(mockCount);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
      },
      skip: 0,
      take: 10,
    });
    expect(prisma.recipe.count).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
      },
    });
  });

  it('should filter recipes by isDeleted=false when provided', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [mockRecipe];
    const mockCount = 1;

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);
    prisma.recipe.count.mockResolvedValue(mockCount);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER', isDeleted: false, page: '1', take: '10' },
    });

    expect(result.data).toEqual(mockRecipes);
    expect(result.pagination.totalCount).toBe(mockCount);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        isDeleted: false,
      },
      skip: 0,
      take: 10,
    });
    expect(prisma.recipe.count).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        isDeleted: false,
      },
    });
  });

  it('should filter recipes by isDeleted=true when provided', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [
      { ...mockRecipe, isDeleted: true },
    ];
    const mockCount = 1;

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);
    prisma.recipe.count.mockResolvedValue(mockCount);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER', isDeleted: true, page: '1', take: '10' },
    });

    expect(result.data).toEqual(mockRecipes);
    expect(result.pagination.totalCount).toBe(mockCount);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        isDeleted: true,
      },
      skip: 0,
      take: 10,
    });
    expect(prisma.recipe.count).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        isDeleted: true,
      },
    });
  });

  it('should return all recipes when isDeleted is not provided', async () => {
    const mockRecipes: TRecipeWithoutMeta[] = [
      mockRecipe,
      { ...mockRecipe, id: 2, isDeleted: true },
    ];
    const mockCount = 2;

    prisma.recipe.findMany.mockResolvedValue(mockRecipes);
    prisma.recipe.count.mockResolvedValue(mockCount);

    const result = await service.get({
      userId: mockUserId,
      query: { queryFilter: 'USER', page: '1', take: '10' },
    });

    expect(result.data).toEqual(mockRecipes);
    expect(result.pagination.totalCount).toBe(mockCount);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
      },
      skip: 0,
      take: 10,
    });
    expect(prisma.recipe.count).toHaveBeenCalledWith({
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

  it('should throw BadRequestException when creating a recipe with duplicate ingredients', async () => {
    const mockRecipeIngredientsWithDuplicates: TRecipeCreate['recipeIngredients'] =
      [
        {
          amount: 100,
          unit: 'GRAMS',
          ingredientId: 1,
          isGlobal: false,
        },
        {
          amount: 200,
          unit: 'GRAMS',
          ingredientId: 1, // Same ingredient ID - duplicate
          isGlobal: false,
        },
      ];

    const createdRecipeData: Omit<TRecipeCreate, 'recipeIngredients'> = {
      name: 'Pasta',
      description: 'Delicious pasta',
      isGlobal: false,
      userId: mockUserId,
    };

    await expect(
      service.create({
        recipeIngredients: mockRecipeIngredientsWithDuplicates,
        ...createdRecipeData,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(prisma.recipe.create).not.toHaveBeenCalled();
  });

  it('should soft delete a recipe', async () => {
    prisma.recipe.update.mockResolvedValue(mockRecipe);

    const result = await service.delete({ userId: mockUserId, id: mockId });
    expect(result).toEqual(mockRecipe);
  });

  it('should throw PrismaClientKnownRequestError if recipe not found during delete', async () => {
    const error = createRecordNotFoundError();

    prisma.recipe.update.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    prisma.$transaction.mockImplementation((cb) => cb(prisma as any));

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

  it('should throw BadRequestException when updating a recipe with duplicate ingredients', async () => {
    const id = 1;

    const mockRecipeIngredientsWithDuplicates: TRecipeUpdate['recipeIngredients'] =
      [
        {
          id: 10,
          amount: 2,
          unit: 'GRAMS',
          ingredientId: 5,
        },
        {
          amount: 1,
          unit: 'GRAMS',
          ingredientId: 5, // Same ingredient ID - duplicate
        },
      ];

    const updateDto: TRecipeCreate = {
      name: 'Updated Recipe Name',
      description: 'Updated description',
      isGlobal: true,
      userId: mockUserId,
      recipeIngredients: mockRecipeIngredientsWithDuplicates,
    };

    await expect(service.update(id, updateDto)).rejects.toThrow(
      BadRequestException,
    );

    expect(prisma.recipeIngredient.findMany).not.toHaveBeenCalled();
  });

  it('should throw PrismaClientKnownRequestError if recipe not found during delete', async () => {
    const error = createRecordNotFoundError();

    prisma.recipe.update.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });
});
