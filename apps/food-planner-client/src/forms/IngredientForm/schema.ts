import { z } from "zod";

export const IngredientFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  isGlobal: z.boolean().optional(),
  file: z
    .custom<File>(val => val instanceof File, "File is required")
    .refine(file => !file || file.type === "image/jpeg", {
      message: "Only JPEG images are allowed",
    })
    .refine(file => !file || file.size <= 2 * 1024 * 1024, {
      message: "Max size is 2MB",
    })
    .optional(),
});
