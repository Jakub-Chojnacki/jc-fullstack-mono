import { QuantityUnit } from "@jcmono/api-contract";
import { z } from "zod";

export const RecipeFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean().optional(),
  description: z.string(),
  recipeIngredients: z.array(
    z.object({
      id: z.number().or(z.string()).optional(),
      amount: z.number().positive("Amount must be greater than 0"),
      unit: z.enum(QuantityUnit),
      ingredientId: z.number(),
    })
  ),
});

export type TRecipeFormValues = z.infer<typeof RecipeFormSchema>;
