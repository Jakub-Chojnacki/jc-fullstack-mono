import { EMealTypes, QuantityUnit } from "@jcmono/api-contract";
import { z } from "zod";

export const IngredientWithAmountSchema = z.object({
  id: z.number().or(z.string()).optional(),
  amount: z.number().positive("Amount must be greater than 0"),
  unit: z.enum(QuantityUnit),
  ingredientId: z
    .number()
    .nullable()
    .transform((value, ctx): number => {
      if (value === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ingredient is required",
        });
        return z.NEVER;
      }
      return value;
    }),
});

export const RecipeFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean().optional(),
  description: z.string(),
  recipeIngredients: z.array(IngredientWithAmountSchema),
  mealTypes: z.array(z.nativeEnum(EMealTypes)).optional(),
});

export type TRecipeFormValues = z.infer<typeof RecipeFormSchema>;
export type TRecipeFormInput = z.input<typeof RecipeFormSchema>;
