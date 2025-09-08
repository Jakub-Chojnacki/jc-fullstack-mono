import { ImageUploadSchema } from "@jcmono/api-contract";
import { z } from "zod";

export const IngredientFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean().optional(),
  file: ImageUploadSchema,
});
