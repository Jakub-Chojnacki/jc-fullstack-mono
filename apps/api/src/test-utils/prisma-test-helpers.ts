import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 * Common Prisma error codes for testing
 */
export const PRISMA_ERROR_CODES = {
  RECORD_NOT_FOUND: 'P2025',
  UNIQUE_CONSTRAINT_VIOLATION: 'P2002',
  FOREIGN_KEY_CONSTRAINT_VIOLATION: 'P2003',
  INVALID_ID: 'P2023',
  TIMEOUT: 'P2024',
} as const;

const DEFAULT_ERROR_MESSAGES = {
  [PRISMA_ERROR_CODES.RECORD_NOT_FOUND]: 'Record to update not found.',
  [PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION]: 'Unique constraint failed.',
  [PRISMA_ERROR_CODES.FOREIGN_KEY_CONSTRAINT_VIOLATION]:
    'Foreign key constraint failed.',
  [PRISMA_ERROR_CODES.INVALID_ID]: 'Invalid ID provided.',
  [PRISMA_ERROR_CODES.TIMEOUT]: 'Request timeout.',
} as const;

export function createPrismaError(
  code: string,
  message?: string,
  meta?: Record<string, any>,
  clientVersion = '5.0.0',
): PrismaClientKnownRequestError {
  const errorMessage =
    message ||
    DEFAULT_ERROR_MESSAGES[code as keyof typeof DEFAULT_ERROR_MESSAGES] ||
    'Unknown error';

  return new PrismaClientKnownRequestError(errorMessage, {
    code,
    clientVersion,
    meta: meta || { cause: errorMessage },
  });
}

export function createRecordNotFoundError(
  message?: string,
): PrismaClientKnownRequestError {
  return createPrismaError(PRISMA_ERROR_CODES.RECORD_NOT_FOUND, message);
}

export function createUniqueConstraintError(
  target?: string[],
  message?: string,
): PrismaClientKnownRequestError {
  const meta = target ? { target } : undefined;
  return createPrismaError(
    PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION,
    message,
    meta,
  );
}

export function createForeignKeyConstraintError(
  field?: string,
  message?: string,
): PrismaClientKnownRequestError {
  const meta = field ? { field_name: field } : undefined;
  return createPrismaError(
    PRISMA_ERROR_CODES.FOREIGN_KEY_CONSTRAINT_VIOLATION,
    message,
    meta,
  );
}
