import { z } from "zod";
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AuthDto = z.infer<typeof LoginSchema>;
export declare const TokensSchema: z.ZodObject<{
    access_token: z.ZodString;
    refresh_token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    refresh_token: string;
}, {
    access_token: string;
    refresh_token: string;
}>;
export type Tokens = z.infer<typeof TokensSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    id: number;
    name: string;
}, {
    email: string;
    id: number;
    name: string;
}>;
export type UserDto = z.infer<typeof UserSchema>;
