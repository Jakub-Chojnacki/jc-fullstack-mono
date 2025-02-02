import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  signupLocal() {
    this.authService.signupLocal();
  }

  @Post('/local/signin')
  signinLocal() {
    this.authService.signinLocal();
  }

  @Post('/local/logout')
  logout() {
    this.authService.logout();
  }

  @Post('/local/refresh')
  refreshToken() {
    this.authService.refreshToken();
  }
}
