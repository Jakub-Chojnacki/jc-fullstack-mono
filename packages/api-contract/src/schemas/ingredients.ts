import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().nonempty("Name is required"),
  userId: z.number(),
  isGlobal: z.boolean().optional(),
});

export type TIngredient = z.infer<typeof IngredientSchema>;

export const IngredientCreateSchema = IngredientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TIngredientCreate = z.infer<typeof IngredientCreateSchema>;

export const IngredientUpdateSchema = IngredientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type TIngredientUpdate = z.infer<typeof IngredientUpdateSchema>;

export const QuantityUnit = [
  "GRAMS",
  "LITERS",
  "MILLILITERS",
  "PIECES",
  "UNITS",
] as const;

export const RecipeIngredientSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amount: z.number(),
  unit: z.enum(QuantityUnit),
  isGlobal: z.boolean().optional(),
  ingredientId: z.number(),
  recipeId: z.number(),
});

export const RecipeIngredientCreateSchema = RecipeIngredientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const RecipeIngredientUpdateSchema = RecipeIngredientSchema.omit({
  createdAt: true,
  updatedAt: true,
  recipeId: true,
});

export type TRecipeIngredientCreate = z.infer<
  typeof RecipeIngredientCreateSchema
>;
