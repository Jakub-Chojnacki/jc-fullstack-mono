import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { LoginSchema, TokensSchema } from "./schemas/index";

export * from "./schemas/index";

const c = initContract();

export const NotFoundSchema = z.object({
  message: z.string(),
});

export const IngredientSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  user_id: z.number(),
});

export type TIngredient = z.infer<typeof IngredientSchema>;

export const contract = c.router(
  {
    ingredients: {
      create: {
        method: "POST",
        path: "/ingredients",
        body: IngredientSchema.omit({ id: true, created_at: true }),
        responses: {
          201: IngredientSchema,
          404: NotFoundSchema,
        },
      },
    },
    auth: {
      signup: {
        method: "POST",
        path: "/signup",
        body: LoginSchema,
        responses: {
          201: TokensSchema,
        },
      },
    },
  },
  {
    pathPrefix: "/api",
  }
);
