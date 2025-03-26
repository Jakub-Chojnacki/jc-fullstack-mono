import { z } from "zod";
export declare const RecipeSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    description: string;
    isGlobal?: boolean | undefined;
}, {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    description: string;
    isGlobal?: boolean | undefined;
}>;
export type TRecipe = z.infer<typeof RecipeSchema>;
export declare const RecipeCreateSchema: z.ZodObject<z.objectUtil.extendShape<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, {
    recipeIngredients: z.ZodArray<z.ZodObject<Omit<Omit<{
        id: z.ZodNumber;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        amount: z.ZodNumber;
        unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
        isGlobal: z.ZodOptional<z.ZodBoolean>;
        ingredientId: z.ZodNumber;
        recipeId: z.ZodNumber;
    }, "id" | "createdAt" | "updatedAt">, "recipeId">, "strip", z.ZodTypeAny, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        isGlobal?: boolean | undefined;
    }, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        isGlobal?: boolean | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    name: string;
    userId: number;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
}, {
    name: string;
    userId: number;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
}>;
export type TRecipeCreate = z.infer<typeof RecipeCreateSchema>;
export declare const RecipeUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    isGlobal?: boolean | undefined;
}, {
    name: string;
    description: string;
    isGlobal?: boolean | undefined;
}>;
export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
