import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type TsRestError = {
  status: 404 | 500;
  body: { message: string };
};

const handlePrismaErrorCode = (error: unknown): TsRestError => {
  const prismaError = error as PrismaClientKnownRequestError;

  switch (prismaError.code) {
    case 'P2025': {
      return {
        status: 404,
        body: { message: 'Resource not found!' },
      };
    }
    default: {
      return {
        status: 500,
        body: { message: 'Internal server error!' },
      };
    }
  }
};

export default handlePrismaErrorCode;
