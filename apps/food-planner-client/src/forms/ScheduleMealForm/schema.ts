import { MealTypes } from "@jcmono/api-contract";
import { z } from "zod";

export const ScheduleMealFormSchema = z.object({
  recipeId: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
  scheduledAt: z.date(),
  mealType: z.enum(MealTypes),
});

export const ScheduleMealFormSchemaWithRecipeId = ScheduleMealFormSchema.extend(
  {
    recipeId: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .transform((val) => val.id),
  }
);

export type TScheduleMealFormValues = z.infer<typeof ScheduleMealFormSchema>;
