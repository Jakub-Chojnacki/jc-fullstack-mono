import { BadRequestException } from '@nestjs/common';

export interface PaginationParams {
  page?: string;
  take?: string;
}

export interface ValidatedPagination {
  skip: number;
  take: number;
}

export interface PaginationOptions {
  maxTake?: number;
  defaultTake?: number;
}

export function validatePagination(
  params: PaginationParams,
  options: PaginationOptions = {},
): ValidatedPagination | null {
  const { page, take } = params;
  const { maxTake = 100, defaultTake = 10 } = options;

  if (page === undefined && take === undefined) {
    return null;
  }

  const pageStr = page ?? '1';
  const takeStr = take ?? defaultTake.toString();

  const pageNum = parseInt(pageStr, 10);
  const takeNum = parseInt(takeStr, 10);

  if (isNaN(pageNum) || isNaN(takeNum)) {
    throw new BadRequestException('Page and take must be valid numbers');
  }

  if (pageNum < 1 || takeNum < 1) {
    throw new BadRequestException(
      'Page and take must be positive numbers greater than 0',
    );
  }

  if (takeNum > maxTake) {
    throw new BadRequestException(`Take cannot be greater than ${maxTake}`);
  }

  const skip = (pageNum - 1) * takeNum;

  return {
    skip,
    take: takeNum,
  };
}
