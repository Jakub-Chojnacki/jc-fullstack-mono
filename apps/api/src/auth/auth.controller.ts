import { contract } from '@jcmono/api-contract';
import {
  Controller,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @TsRestHandler(contract.auth)
  async signupLocal() {
    return tsRestHandler(contract.auth, {
      signup: async ({ body: { email, password } }) => {
        const tokens = await this.authService.signupLocal({ email, password });

        return {
          status: 201,
          body: tokens,
        };
      },
      signin: async ({ body: { email, password } }) => {
        const tokens = await this.authService.signinLocal({ email, password });

        return {
          status: 200,
          body: tokens,
        };
      },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @TsRestHandler(contract.logout)
  async logout(@Req() req: Request) {
    return tsRestHandler(contract.logout, async () => {
      const user = req.user as { sub: number };

      if (user) {
        await this.authService.logout(user?.sub);

        return {
          status: 200,
          body: null,
        };
      }

      return {
        status: 200,
        body: null,
      };
    });
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @TsRestHandler(contract.refreshToken)
  async refreshToken() {
    return tsRestHandler(contract.logout, async () => {
      await this.authService.logout(1);

      return {
        status: 200,
        body: null,
      };
    });
  }
}
