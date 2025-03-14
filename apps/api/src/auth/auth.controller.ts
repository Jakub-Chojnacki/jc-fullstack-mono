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

  @TsRestHandler(contract.auth)
  @Public()
  async signupLocal(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return tsRestHandler(contract.auth, {
      signup: async ({ body: { email, password } }) => {
        const message = await this.authService.signupLocal(
          { email, password },
          res,
        );

        return {
          status: 201,
          body: message,
        };
      },
      signin: async ({ body: { email, password } }) => {
        const message = await this.authService.signinLocal(
          { email, password },
          res,
        );

        res.send({
          status: 200,
          body: message,
        });

        return {
          status: 200,
          body: message,
        };
      },
    });
  }

  @UseGuards(AtGuard)
  @TsRestHandler(contract.logout)
  async logout(
    @GetCurrentUserId() userId: number,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return tsRestHandler(contract.logout, async () => {
      await this.authService.logout(userId);

      res.cookie('access_token', '', { httpOnly: true, maxAge: 0 });
      res.cookie('refresh_token', '', { httpOnly: true, maxAge: 0 });

      return {
        status: 200,
        body: null,
      };
    });
  }
  @TsRestHandler(contract.refreshToken)
  @Public()
  @UseGuards(RtGuard)
  async refreshToken(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return tsRestHandler(contract.refreshToken, async () => {
      const message = await this.authService.refreshTokens(
        userId,
        refreshToken,
        res,
      );

      res.send({
        status: 200,
        body: message,
      });

      return {
        status: 200,
        body: message,
      };
    });
  }
}
