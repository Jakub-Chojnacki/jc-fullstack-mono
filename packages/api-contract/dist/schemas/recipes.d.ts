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
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isGlobal: boolean;
    description: string;
}, {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isGlobal: boolean;
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
    name: string;
    userId: number;
    isGlobal: boolean;
    description: string;
}, {
    name: string;
    userId: number;
    isGlobal: boolean;
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
    name: string;
    isGlobal: boolean;
    description: string;
}, {
    name: string;
    isGlobal: boolean;
    description: string;
}>;
export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
