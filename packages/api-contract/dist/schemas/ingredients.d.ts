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
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    isGlobal: boolean;
}, {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
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
export declare const QuantityUnit: readonly ["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"];
export declare const RecipeIngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isGlobal: z.ZodBoolean;
    ingredientId: z.ZodNumber;
    recipeId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isGlobal: boolean;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isGlobal: boolean;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
}>;
export declare const RecipeIngredientCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isGlobal: z.ZodBoolean;
    ingredientId: z.ZodNumber;
    recipeId: z.ZodNumber;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    isGlobal: boolean;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
}, {
    isGlobal: boolean;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
}>;
export type TRecipeIngredientCreate = z.infer<typeof RecipeIngredientCreateSchema>;
