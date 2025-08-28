import { ErrorCodes } from '@jcmono/api-contract';
import type { AppRoute } from '@ts-rest/core';
import { TsRestException } from '@ts-rest/nest';
import handlePrismaErrorCode from '../handlePrismaErrorCode';
import isPrismaError from '../isPrismaError';

const wrapWithTsRestError = async <T>(
  contractEndpoint: AppRoute,
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (isPrismaError(error)) {
      const prismaError = handlePrismaErrorCode(error);
      throw new TsRestException(contractEndpoint, prismaError);
    }

    const isNativeError = error instanceof Error;

    throw new TsRestException(contractEndpoint, {
      status: 500,
      body: {
        message: isNativeError ? error.message : 'Internal server error',
        code: isNativeError ? ErrorCodes.BASIC_ERROR : ErrorCodes.UNKNOWN_ERROR,
      },
    });
  }
};

export default wrapWithTsRestError;
