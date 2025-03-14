import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" });

export const signupFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
