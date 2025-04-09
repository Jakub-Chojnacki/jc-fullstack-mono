import { z } from "zod";

import { QuantityUnit } from "./ingredients";

export const ShoppingListIngredientSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amount: z.number(),
  unit: z.enum(QuantityUnit),
  isDone: z.boolean(),
  ingredientId: z.number(),
  userId: z.number(),
});

export type TShoppingListIngredient = z.infer<
  typeof ShoppingListIngredientSchema
>;

export const ShoppingListIngredientCreateSchema =
  ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  });

export type TShoppingListIngredientCreate = z.infer<
  typeof ShoppingListIngredientCreateSchema
>;

export const ShoppingListIngredientUpdateSchema =
  ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  });

export type TShoppingListIngredientUpdate = z.infer<
  typeof ShoppingListIngredientUpdateSchema
>;
