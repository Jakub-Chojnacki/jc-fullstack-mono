import { JwtPayloadWithRt } from 'src/auth/types';

declare module 'express' {
  interface Request {
    user: JwtPayloadWithRt;
  }
}
