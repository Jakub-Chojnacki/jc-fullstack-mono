import type { TScheduleMealsCreate } from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { TsRestException } from '@ts-rest/nest';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleMealsService } from './schedule-meals.service';

describe('ScheduleMealsService', () => {
  let service: ScheduleMealsService;

  const mockData: TScheduleMealsCreate = {
    userId: 1,
    recipeId: 1,
    scheduledAt: new Date(),
    mealType: 'BREAKFAST',
  };

  let prisma: {
    scheduledMeal: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleMealsService,
        {
          provide: PrismaService,
          useValue: {
            scheduledMeal: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ScheduleMealsService>(ScheduleMealsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a scheduled meal', async () => {
    prisma.scheduledMeal.create.mockResolvedValue(mockData);

    const result = await service.create(mockData);
    expect(result).toEqual(mockData);

    expect(prisma.scheduledMeal.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('should update a scheduled meal', async () => {
    prisma.scheduledMeal.update.mockResolvedValue(mockData);

    const result = await service.update(1, mockData);
    expect(result).toEqual(mockData);

    expect(prisma.scheduledMeal.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: mockData,
    });
  });

  it('should throw TsRestException if not found during update', async () => {
    const error = { code: 'P2025' };

    prisma.scheduledMeal.update.mockRejectedValue(error);

    await expect(
      service.update(999, { recipeId: 1, scheduledAt: new Date() }),
    ).rejects.toThrow(TsRestException);
  });

  it('should delete a scheduled meal', async () => {
    prisma.scheduledMeal.delete.mockResolvedValue({ id: 1 });

    const result = await service.delete(1);
    expect(result).toEqual({ id: 1 });

    expect(prisma.scheduledMeal.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw TsRestException if not found during delete', async () => {
    const error = { code: 'P2025' };

    prisma.scheduledMeal.delete.mockRejectedValue(error);

    await expect(service.delete(999)).rejects.toThrow(TsRestException);
  });

  it('should get scheduled meals for a user', async () => {
    prisma.scheduledMeal.findMany.mockResolvedValue([mockData]);

    const result = await service.get(1);
    expect(result).toEqual([mockData]);

    expect(prisma.scheduledMeal.findMany).toHaveBeenCalledWith({
      where: {
        userId: 1,
      },
    });
  });
});
