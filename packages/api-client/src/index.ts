import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { IngredientSchema, LoginSchema, TokensSchema } from "./schemas/index";

export * from "./schemas/index";

const c = initContract();

export const NotFoundSchema = z.object({
  message: z.string(),
});

export const contract = c.router(
  {
    ingredients: {
      getAll: {
        method: "GET",
        path: "/ingredients",
        responses: {
          200: z.array(IngredientSchema),
        },
      },
      getForUser: {
        method: "GET",
        path: "/ingredients/:userId",
        pathParams: z.object({ userId: z.number() }),
        responses: {
          200: z.array(IngredientSchema),
        },
      },
      create: {
        method: "POST",
        path: "/ingredients",
        body: IngredientSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true,
        }),
        responses: {
          201: IngredientSchema,
          400: NotFoundSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/ingredients/:id",
        pathParams: z.object({ id: z.number() }),
        body: IngredientSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true,
        }),
        responses: {
          200: IngredientSchema,
          404: NotFoundSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/ingredients/:id",
        pathParams: z.object({ id: z.number() }),
        responses: {
          200: null,
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
      signin: {
        method: "POST",
        path: "/signin",
        body: LoginSchema,
        responses: {
          200: TokensSchema,
        },
      },
    },
    logout: {
      method: "POST",
      path: "/logout",
      body: null,
      responses: {
        200: null,
      },
    },
    refreshToken: {
      method: "POST",
      path: "/refresh",
      body: null,
      responses: {
        200: TokensSchema,
      },
    },
  },
  {
    pathPrefix: "/api",
  }
);
