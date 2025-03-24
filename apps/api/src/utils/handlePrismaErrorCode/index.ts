import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type TsRestError = {
  status: 400 | 404 | 500;
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
    case 'P2003': {
      return {
        status: 400,
        body: { message: 'Some of the passed ids are invalid!' },
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
