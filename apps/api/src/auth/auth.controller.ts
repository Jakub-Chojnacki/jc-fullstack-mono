import { contract } from '@jcmono/api-contract';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { AuthService } from './auth.service';

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
    });
  }
}
