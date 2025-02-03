import { AuthDto, Tokens } from '@jcmono/api-contract';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(userId: number, email: string): Promise<Tokens> {
    const accessExpiration = 60 * 15; // 15 minutes in seconds
    const refreshExpiration = 60 * 60 * 24 * 7; // 7 days in seconds

    const at = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: accessExpiration,
        secret: process.env.AT_SECRET,
      },
    );

    const rt = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: refreshExpiration,
        secret: process.env.RT_SECRET,
      },
    );

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signupLocal(dto: AuthDto) {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    const { id, email } = newUser;

    const tokens = await this.getToken(id, email);

    await this.updateRtHash(id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const { id, email, hash } = user;

    const passwordMatches = await bcrypt.compare(dto.password, hash);

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getToken(id, email);

    await this.updateRtHash(id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRt: { not: null } },
      data: { hashedRt: null },
    });
  }

  async updateRtHash(userId: number, rt: string) {
    //Save the refresh token in the database
    const hashedRt = await this.hashData(rt);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt },
    });
  }

  refreshToken() {
    return 'refreshToken';
  }
}
