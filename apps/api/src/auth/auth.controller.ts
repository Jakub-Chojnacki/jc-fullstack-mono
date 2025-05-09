import { contract } from '@jcmono/api-contract';
import { Controller, Res, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { type Response } from 'express';

import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @TsRestHandler(contract.auth.signup)
  @Public()
  signup(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(
      contract.auth.signup,
      async ({ body: { email, password } }) => {
        const message = await this.authService.signupLocal(
          { email, password },
          res,
        );

        return {
          status: 201,
          body: message,
        };
      },
    );
  }

  @TsRestHandler(contract.auth.signin)
  @Public()
  signin(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(
      contract.auth.signin,
      async ({ body: { email, password } }) => {
        const message = await this.authService.signinLocal(
          { email, password },
          res,
        );

        return {
          status: 200,
          body: message,
        };
      },
    );
  }

  @UseGuards(AtGuard)
  @TsRestHandler(contract.auth.me)
  me(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.auth.me, async () => {
      const user = await this.authService.me(userId);

      if (!user) {
        return {
          status: 404,
          body: { message: 'User not found' },
        };
      }

      return {
        status: 200,
        body: user,
      };
    });
  }

  @UseGuards(AtGuard)
  @TsRestHandler(contract.auth.logout)
  logout(
    @GetCurrentUserId() userId: number,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return tsRestHandler(contract.auth.logout, async () => {
      await this.authService.logout(userId, res);

      return {
        status: 200,
        body: null,
      };
    });
  }

  @TsRestHandler(contract.auth.refreshToken)
  @Public()
  @UseGuards(RtGuard)
  refreshToken(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return tsRestHandler(contract.auth.refreshToken, async () => {
      const message = await this.authService.refreshTokens(
        userId,
        refreshToken,
        res,
      );

      return {
        status: 200,
        body: message,
      };
    });
  }
}
