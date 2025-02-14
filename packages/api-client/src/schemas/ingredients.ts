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
