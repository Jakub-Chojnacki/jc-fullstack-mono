import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
import { JwtPayload } from '../../auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
