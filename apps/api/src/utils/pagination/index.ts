import { BadRequestException } from '@nestjs/common';
import { DEFAULT_TAKE } from 'src/common/constants/main';

export interface PaginationParams {
  page?: string;
  take?: string;
}

export interface ValidatedPagination {
  skip: number;
  take: number;
  page: number;
}

export interface PaginationOptions {
  maxTake?: number;
  defaultTake?: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export function validatePagination(
  params: PaginationParams,
  options: PaginationOptions = {},
): ValidatedPagination {
  const { page, take } = params;
  const { maxTake = 100, defaultTake = DEFAULT_TAKE } = options;

  // Always use defaults if parameters are not provided
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
    page: pageNum,
  };
}

export function createPaginationMeta(
  totalCount: number,
  currentPage: number,
  itemsPerPage: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return {
    currentPage,
    totalPages,
    totalCount,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    itemsPerPage,
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  totalCount: number,
  pagination: ValidatedPagination,
): PaginatedResponse<T> {
  const meta = createPaginationMeta(
    totalCount,
    pagination.page,
    pagination.take,
  );

  return {
    data,
    pagination: meta,
  };
}
