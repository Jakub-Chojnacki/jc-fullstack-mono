import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  
  signupLocal() {
    return 'signupLocal';
  }

  signinLocal() {
    return 'signinLocal';
  }

  logout() {
    return 'logout';
  }
  refreshToken() {
    return 'refreshToken';
  }
}
