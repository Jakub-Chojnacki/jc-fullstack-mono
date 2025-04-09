import { z } from "zod";
export declare const ShoppingListIngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isDone: z.ZodBoolean;
    ingredientId: z.ZodNumber;
    shoppingListId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}>;
export type TShoppingListIngredient = z.infer<typeof ShoppingListIngredientSchema>;
export declare const ShoppingListIngredientCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isDone: z.ZodBoolean;
    ingredientId: z.ZodNumber;
    shoppingListId: z.ZodNumber;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}>;
export type TShoppingListIngredientCreate = z.infer<typeof ShoppingListIngredientCreateSchema>;
export declare const ShoppingListIngredientUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    amount: z.ZodNumber;
    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
    isDone: z.ZodBoolean;
    ingredientId: z.ZodNumber;
    shoppingListId: z.ZodNumber;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}, {
    amount: number;
    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
    isDone: boolean;
    ingredientId: number;
    shoppingListId: number;
}>;
export type TShoppingListIngredientUpdate = z.infer<typeof ShoppingListIngredientUpdateSchema>;
