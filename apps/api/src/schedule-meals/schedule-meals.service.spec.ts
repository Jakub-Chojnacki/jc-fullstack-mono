import type { TScheduleMealsCreate } from '@jcmono/api-contract';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRecordNotFoundError } from 'src/test-utils';
import { ScheduleMealsService } from './schedule-meals.service';

describe('ScheduleMealsService', () => {
  let service: ScheduleMealsService;

  const mockUserId = 123;

  let startDate: string;
  let endDate: string;
  let mockData: TScheduleMealsCreate;

  let prisma: {
    scheduledMeal: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };
  beforeEach(async () => {
    const fakeNow = new Date('2025-01-01T00:00:00.000Z');
    jest.useFakeTimers().setSystemTime(fakeNow);

    startDate = fakeNow.toISOString();

    const futureDate = new Date(fakeNow);
    futureDate.setDate(futureDate.getDate() + 5);
    endDate = futureDate.toISOString();

    mockData = {
      recipeId: 1,
      scheduledAt: startDate,
      mealType: 'BREAKFAST',
    };

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

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a scheduled meal', async () => {
    prisma.scheduledMeal.create.mockResolvedValue(mockData);

    const result = await service.create(mockUserId, mockData);
    expect(result).toEqual(mockData);

    expect(prisma.scheduledMeal.create).toHaveBeenCalledWith({
      data: { ...mockData, userId: mockUserId },
    });
  });

  it('should update a scheduled meal', async () => {
    const mockDataWithDate = {
      ...mockData,
      scheduledAt: new Date(mockData.scheduledAt),
    };

    prisma.scheduledMeal.update.mockResolvedValue(mockDataWithDate);

    const result = await service.update(1, mockData);
    expect(result).toEqual(mockDataWithDate);

    expect(prisma.scheduledMeal.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: mockDataWithDate,
    });
  });

  it('should throw PrismaClientKnownRequestError if not found during update', async () => {
    const error = createRecordNotFoundError();

    prisma.scheduledMeal.update.mockRejectedValue(error);

    await expect(
      service.update(999, { recipeId: 1, scheduledAt: new Date() }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });

  it('should delete a scheduled meal', async () => {
    prisma.scheduledMeal.delete.mockResolvedValue({ id: 1 });

    const result = await service.delete({ id: 1, userId: mockUserId });
    expect(result).toEqual({ id: 1 });

    expect(prisma.scheduledMeal.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
        userId: mockUserId,
      },
    });
  });

  it('should throw PrismaClientKnownRequestError if not found during delete', async () => {
    const error = createRecordNotFoundError('Record to delete does not exist.');

    prisma.scheduledMeal.delete.mockRejectedValue(error);

    await expect(
      service.delete({ id: 999, userId: mockUserId }),
    ).rejects.toThrow(PrismaClientKnownRequestError);
  });

  it('should get scheduled meals for a user', async () => {
    prisma.scheduledMeal.findMany.mockResolvedValue([mockData]);

    const result = await service.get({
      userId: mockUserId,
      startDate,
      endDate,
    });
    expect(result).toEqual([mockData]);

    expect(prisma.scheduledMeal.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        scheduledAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        recipe: true,
      },
    });
  });
});
