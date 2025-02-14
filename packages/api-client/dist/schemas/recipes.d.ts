import { z } from "zod";
export declare const RecipeSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
    name: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isGlobal: boolean;
    name: string;
    description: string;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isGlobal: boolean;
    name: string;
    description: string;
}>;
export type TRecipe = z.infer<typeof RecipeSchema>;
export declare const RecipeCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
    name: z.ZodString;
    description: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    userId: number;
    isGlobal: boolean;
    name: string;
    description: string;
}, {
    userId: number;
    isGlobal: boolean;
    name: string;
    description: string;
}>;
export type TRecipeCreate = z.infer<typeof RecipeCreateSchema>;
export declare const RecipeUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
    name: z.ZodString;
    description: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
    isGlobal: boolean;
    name: string;
    description: string;
}, {
    isGlobal: boolean;
    name: string;
    description: string;
}>;
export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
