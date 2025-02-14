import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number(),
  isGlobal: z.boolean(),
  name: z.string(),
  description: z.string(),
});

export type TRecipe = z.infer<typeof RecipeSchema>;

export const RecipeCreateSchema = RecipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TRecipeCreate = z.infer<typeof RecipeCreateSchema>;

export const RecipeUpdateSchema = RecipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;
