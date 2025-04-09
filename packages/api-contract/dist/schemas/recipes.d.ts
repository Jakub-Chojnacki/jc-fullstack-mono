import { z } from "zod";
export declare const RecipeSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    description: string;
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    description: string;
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
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
    isDeleted: z.ZodOptional<z.ZodBoolean>;
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
    isDeleted?: boolean | undefined;
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
    isDeleted?: boolean | undefined;
}>;
export type TRecipeCreate = z.infer<typeof RecipeCreateSchema>;
export declare const RecipeUpdateSchema: z.ZodObject<z.objectUtil.extendShape<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
}, "id" | "createdAt" | "updatedAt" | "userId">, {
    recipeIngredients: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<Omit<{
        id: z.ZodNumber;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        amount: z.ZodNumber;
        unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
        isGlobal: z.ZodOptional<z.ZodBoolean>;
        ingredientId: z.ZodNumber;
        recipeId: z.ZodNumber;
    }, "createdAt" | "updatedAt" | "recipeId">, {
        id: z.ZodOptional<z.ZodNumber>;
    }>, "strip", z.ZodTypeAny, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        isGlobal?: boolean | undefined;
    }, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        isGlobal?: boolean | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
}, {
    name: string;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
}>;
export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
export declare const RecipeGetOneSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    isGlobal: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    description: z.ZodString;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
}, {
    recipeIngredients: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<Omit<{
        id: z.ZodNumber;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        amount: z.ZodNumber;
        unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
        isGlobal: z.ZodOptional<z.ZodBoolean>;
        ingredientId: z.ZodNumber;
        recipeId: z.ZodNumber;
    }, "createdAt" | "updatedAt" | "recipeId">, {
        id: z.ZodOptional<z.ZodNumber>;
    }>, {
        name: z.ZodOptional<z.ZodString>;
    }>, "strip", z.ZodTypeAny, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        name?: string | undefined;
        isGlobal?: boolean | undefined;
    }, {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        name?: string | undefined;
        isGlobal?: boolean | undefined;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        name?: string | undefined;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    description: string;
    recipeIngredients: {
        amount: number;
        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
        ingredientId: number;
        id?: number | undefined;
        name?: string | undefined;
        isGlobal?: boolean | undefined;
    }[];
    isGlobal?: boolean | undefined;
    isDeleted?: boolean | undefined;
}>;
export type TRecipeGetOne = z.infer<typeof RecipeGetOneSchema>;
export declare const RecipeGetQuerySchema: z.ZodObject<{
    queryFilter: z.ZodOptional<z.ZodEnum<["USER", "GLOBAL", "ALL"]>>;
    isDeleted: z.ZodOptional<z.ZodEffects<z.ZodBoolean, boolean, unknown>>;
}, "strip", z.ZodTypeAny, {
    isDeleted?: boolean | undefined;
    queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
}, {
    isDeleted?: unknown;
    queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
}>;
export type TRecipeGetQuery = z.infer<typeof RecipeGetQuerySchema>;
