import { z } from "zod";

export const IngredientFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean(),
});
