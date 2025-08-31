import { z } from "zod";

import { QuantityUnit } from "./ingredients";
import { BooleanQuerySchema } from "./utils";

export const MAXIMUM_SAVED_SHOPPING_LIST_ITEMS = 50;

export const ShoppingListIngredientSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amount: z.number(),
  unit: z.enum(QuantityUnit),
  isDone: z.boolean(),
  isDeleted: z.boolean(),
  ingredientId: z.number(),
  userId: z.number(),
});

export type TShoppingListIngredient = z.infer<
  typeof ShoppingListIngredientSchema
>;

export const ShoppingListIngredientGetSchema = ShoppingListIngredientSchema.omit({
  createdAt: true,
  updatedAt: true,
  userId: true,
}).extend({
  ingredient: z.object({
    name:z.string()
  })
})

export type TShoppingListIngredientGet = z.infer<
  typeof ShoppingListIngredientGetSchema
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

export const ShoppingListIngredientGetQuerySchema = z.object({
  take: z.number().optional(),
  isDone: BooleanQuerySchema.optional(),
 })

export type TShoppingListIngredientGetQuery = z.infer<
  typeof ShoppingListIngredientGetQuerySchema
>;