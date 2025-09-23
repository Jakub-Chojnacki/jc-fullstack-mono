import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context
      .switchToHttp()
      .getRequest<{ session?: { user?: { id?: string } } }>();

    return String(request.session?.user?.id ?? '');
  },
);
