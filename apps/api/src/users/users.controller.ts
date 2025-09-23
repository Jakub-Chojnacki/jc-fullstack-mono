import type { UserSession } from '@mguay/nestjs-better-auth';
import { AuthGuard, Session } from '@mguay/nestjs-better-auth';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('me')
  me(@Session() session: UserSession) {
    console.log(session);
    return { user: session.user };
  }
}
