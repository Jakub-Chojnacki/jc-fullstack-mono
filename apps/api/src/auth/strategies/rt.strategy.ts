import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRt } from '../types';

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

  validate(req: RequestType, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req.cookies?.refresh_token as string;

    return { ...payload, refreshToken };
  }

  private static extractJWT(this: void, req: RequestType): string | null {
    if (
      req.cookies &&
      'refresh_token' in req.cookies &&
      typeof req.cookies.refresh_token === 'string' &&
      req.cookies.refresh_token.length > 0
    ) {
      return req.cookies.refresh_token;
    }
    return null;
  }
}
