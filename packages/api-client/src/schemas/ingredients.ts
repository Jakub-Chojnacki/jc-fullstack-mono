import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  userId: z.number(),
  isGlobal: z.boolean(),
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
