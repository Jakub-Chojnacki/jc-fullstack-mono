import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
import { JwtPayloadWithRt } from 'src/auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!data) return request.user;

    return request.user[data];
  },
);
