// src/lib/auth.ts
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

const isProduction = process.env.NODE_ENV === 'production';
const isSecure = process.env.NODE_ENV === 'production';
const sameSite = isProduction ? 'none' : 'lax';

export const auth = betterAuth({
  url: process.env.BETTER_AUTH_URL, // Used to build callback URLs & cookies
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: { enabled: true },
  advanced: {
    cookies: {
      session_token: {
        attributes: {
          sameSite: sameSite,
          secure: isSecure,
          httpOnly: true,
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [process.env.CORS_ORIGIN || 'http://localhost:5173'],
});
