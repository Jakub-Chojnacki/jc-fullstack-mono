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
  shoppingListId: z.number(),
});

export type TShoppingListIngredient = z.infer<
  typeof ShoppingListIngredientSchema
>;

export const ShoppingListIngredientCreateSchema =
  ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type TShoppingListIngredientCreate = z.infer<
  typeof ShoppingListIngredientCreateSchema
>;

export const ShoppingListIngredientUpdateSchema =
  ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type TShoppingListIngredientUpdate = z.infer<
  typeof ShoppingListIngredientUpdateSchema
>;

export const ShoppingListSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number(),
  ingredients: z.array(ShoppingListIngredientSchema),
});

export type TShoppingList = z.infer<typeof ShoppingListSchema>;

export const ShoppingListCreateSchema = ShoppingListSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TShoppingListCreate = z.infer<typeof ShoppingListCreateSchema>;

export const ShoppingListUpdateSchema = ShoppingListSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type TShoppingListUpdate = z.infer<typeof ShoppingListUpdateSchema>;
