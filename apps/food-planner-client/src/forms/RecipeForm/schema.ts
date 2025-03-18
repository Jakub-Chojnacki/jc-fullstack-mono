import { z } from "zod";

export const RecipeFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean(),
  description:z.string()
});
