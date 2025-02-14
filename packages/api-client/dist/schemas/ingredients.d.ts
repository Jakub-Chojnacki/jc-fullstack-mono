import { z } from "zod";
export declare const IngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal: boolean;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal: boolean;
}>;
export type TIngredient = z.infer<typeof IngredientSchema>;
export declare const IngredientCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    userId: number;
    isGlobal: boolean;
}, {
    name: string;
    userId: number;
    isGlobal: boolean;
}>;
export type TIngredientCreate = z.infer<typeof IngredientCreateSchema>;
export declare const IngredientUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
}, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
    name: string;
    isGlobal: boolean;
}, {
    name: string;
    isGlobal: boolean;
}>;
export type TIngredientUpdate = z.infer<typeof IngredientUpdateSchema>;
