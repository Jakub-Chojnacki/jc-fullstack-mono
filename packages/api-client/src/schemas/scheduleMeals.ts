import { z } from "zod";
import { BasePrismaSchema } from "./utils";

const MealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"] as const;

export const ScheduleMealsSchema = BasePrismaSchema.extend({
  userId: z.number(),
  recipeId: z.number(),
  mealType: z.enum(MealTypes).nullish(),
  scheduledAt: z.date(),
});

export const ScheduleMealsCreateSchema = ScheduleMealsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
