import { z } from "zod";
export declare const IngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal?: boolean | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal?: boolean | undefined;
}>;
export type TIngredient = z.infer<typeof IngredientSchema>;
export declare const IngredientCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    userId: number;
    isGlobal?: boolean | undefined;
}, {
    name: string;
    userId: number;
    isGlobal?: boolean | undefined;
}>;
export type TIngredientCreate = z.infer<typeof IngredientCreateSchema>;
export declare const IngredientUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
}, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
    name: string;
    isGlobal?: boolean | undefined;
}, {
    name: string;
    isGlobal?: boolean | undefined;
}>;
export type TIngredientUpdate = z.infer<typeof IngredientUpdateSchema>;
export declare const QuantityUnit: readonly ["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"];
export declare const RecipeIngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    ingredientId: z.ZodNumber;
    recipeId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
    isGlobal?: boolean | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
    isGlobal?: boolean | undefined;
}>;
export declare const RecipeIngredientCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    ingredientId: z.ZodNumber;
    recipeId: z.ZodNumber;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
    isGlobal?: boolean | undefined;
}, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    ingredientId: number;
    recipeId: number;
    isGlobal?: boolean | undefined;
}>;
export type TRecipeIngredientCreate = z.infer<typeof RecipeIngredientCreateSchema>;
