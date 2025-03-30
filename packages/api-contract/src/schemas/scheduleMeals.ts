import { z } from "zod";
import { BasePrismaSchema } from "./utils";
import { RecipeSchema } from "./recipes";

export const MealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const;

export enum EMealTypes {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK",
}

export const ScheduleMealsSchema = BasePrismaSchema.extend({
  recipeId: z.number(),
  mealType: z.enum(MealTypes).nullish(),
  scheduledAt: z.string().datetime().or(z.date()),
});

export const ScheduleMealsCreateSchema = ScheduleMealsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ScheduleMealsUpdateSchema = ScheduleMealsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ScheduleMealsGetSchema = ScheduleMealsSchema.extend({
  recipe: RecipeSchema,
});

export type TScheduleMeals = z.infer<typeof ScheduleMealsSchema>;
export type TScheduleMealsCreate = z.infer<typeof ScheduleMealsCreateSchema>;
export type TScheduleMealsUpdate = z.infer<typeof ScheduleMealsUpdateSchema>;
