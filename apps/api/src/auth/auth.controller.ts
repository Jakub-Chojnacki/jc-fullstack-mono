import { contract } from '@jcmono/api-contract';
import { Controller, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
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

  @Public()
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

  @UseGuards(AtGuard)
  @TsRestHandler(contract.logout)
  async logout(@GetCurrentUserId() userId: number) {
    return tsRestHandler(contract.logout, async () => {
      await this.authService.logout(userId);

      return {
        status: 200,
        body: null,
      };
    });
  }

  @Public()
  @UseGuards(RtGuard)
  @TsRestHandler(contract.refreshToken)
  async refreshToken(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    return tsRestHandler(contract.refreshToken, async () => {
      const tokens = await this.authService.refreshTokens(userId, refreshToken);

      return {
        status: 200,
        body: tokens,
      };
    });
  }
}
