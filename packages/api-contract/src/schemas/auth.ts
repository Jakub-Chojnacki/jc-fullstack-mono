import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthDto = z.infer<typeof LoginSchema>;

export const TokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type Tokens = z.infer<typeof TokensSchema>;
