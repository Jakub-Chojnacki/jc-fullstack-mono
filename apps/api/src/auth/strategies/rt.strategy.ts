import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.RT_SECRET as string,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestType, payload: any) {
    const refreshToken = req.cookies?.refresh_token;

    return { ...payload, refreshToken };
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'refresh_token' in req.cookies &&
      req.cookies.refresh_token.length > 0
    ) {
      return req.cookies.refresh_token;
    }
    return null;
  }
}
