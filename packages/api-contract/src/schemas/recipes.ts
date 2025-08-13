import { z } from "zod";

import {
  RecipeIngredientCreateSchema,
  RecipeIngredientUpdateSchema,
} from "./ingredients";

import { BooleanQuerySchema, GetQueryFilter } from "./utils";

export const RecipeSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number(),
  isGlobal: z.boolean().optional(),
  name: z.string(),
  description: z.string(),
  isDeleted: z.boolean().optional(),
});

export type TRecipe = z.infer<typeof RecipeSchema>;

export const RecipeCreateSchema = RecipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  recipeIngredients: z.array(
    RecipeIngredientCreateSchema.omit({ recipeId: true })
  ),
});

export type TRecipeCreate = z.infer<typeof RecipeCreateSchema>;

export const RecipeUpdateSchema = RecipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
}).extend({
  recipeIngredients: z.array(RecipeIngredientUpdateSchema),
});

export type TRecipeUpdate = z.infer<typeof RecipeUpdateSchema>;

export const RecipeGetOneSchema = RecipeSchema.extend({
  recipeIngredients: z
    .array(
      RecipeIngredientUpdateSchema.extend({
        name: z.string().optional(),
        id: z.number(),
      })
    )
    .optional(),
});

export type TRecipeGetOne = z.infer<typeof RecipeGetOneSchema>;

export const RecipeGetQuerySchema = z.object({
  queryFilter: GetQueryFilter.optional(),
  isDeleted: BooleanQuerySchema.optional(),
});

export type TRecipeGetQuery = z.infer<typeof RecipeGetQuerySchema>;
