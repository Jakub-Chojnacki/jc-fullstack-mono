import { AuthDto, contract, Tokens } from '@jcmono/api-contract';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { type Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import wrapWithTsRestError from 'src/utils/wrapWithTsRestError';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private accessExpirationSeconds = 60 * 15; // 15 minutes in seconds
  private refreshExpirationSeconds = 60 * 60 * 24 * 7; // 7 days in seconds

  setTokensInCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: this.accessExpirationSeconds * 1000, // 15 minutes in milliseconds
    });

    // Set the Refresh Token in an HTTP-only cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: this.refreshExpirationSeconds * 1000, // 7 days in milliseconds
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(userId: number, email: string): Promise<Tokens> {
    const at = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: this.accessExpirationSeconds,
        secret: process.env.AT_SECRET,
      },
    );

    const rt = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: this.refreshExpirationSeconds,
        secret: process.env.RT_SECRET,
      },
    );

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signupLocal(dto: AuthDto, response: Response) {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    const { id, email } = newUser;

    const { access_token, refresh_token } = await this.getToken(id, email);

    await this.updateRtHash(id, refresh_token);

    this.setTokensInCookies(response, access_token, refresh_token);

    return 'User has been created';
  }

  async signinLocal(dto: AuthDto, response: Response): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const { id, email, hash } = user;

    const passwordMatches = await bcrypt.compare(dto.password, hash);

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const { access_token, refresh_token } = await this.getToken(id, email);

    await this.updateRtHash(id, refresh_token);

    this.setTokensInCookies(response, access_token, refresh_token);

    return 'User has been signed in';
  }

  async logout(userId: number, res: Response) {
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRt: { not: null } },
      data: { hashedRt: null },
    });

    res.cookie('access_token', '', { httpOnly: true, maxAge: 0 });
    res.cookie('refresh_token', '', { httpOnly: true, maxAge: 0 });
  }

  async updateRtHash(userId: number, rt: string) {
    //Save the refresh token in the database
    const hashedRt = await this.hashData(rt);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt },
    });
  }

  async refreshTokens(userId: number, rt: string, response: Response) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    if (!user.hashedRt) throw new NotFoundException('Refresh token not found');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const { id, email } = user;

    const { access_token, refresh_token } = await this.getToken(id, email);

    await this.updateRtHash(id, refresh_token);

    this.setTokensInCookies(response, access_token, refresh_token);

    return 'Tokens have been refreshed';
  }

  async me(userId: number) {
    return wrapWithTsRestError(
      contract.auth.me,
      async () =>
        await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        }),
    );
  }
}
