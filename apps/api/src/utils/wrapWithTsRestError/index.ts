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

    throw new TsRestException(contractEndpoint, {
      status: 500,
      body: { message: 'Internal server error' },
    });
  }
};

export default wrapWithTsRestError;
