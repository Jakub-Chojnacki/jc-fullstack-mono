import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  IngredientSchema,
  LoginSchema,
  RecipeIngredientCreateSchema,
  RecipeIngredientSchema,
  RecipeSchema,
  StringToNumberSchema,
  TokensSchema,
} from "./schemas/index";
import {
  ScheduleMealsCreateSchema,
  ScheduleMealsSchema,
  ScheduleMealsUpdateSchema,
} from "./schemas/scheduleMeals";

export * from "./schemas/index";

const c = initContract();

export const NotFoundSchema = z.object({
  message: z.string(),
});

export const contract = c.router(
  {
    ingredients: {
      getGlobal: {
        method: "GET",
        path: "/ingredients/global",
        responses: {
          200: z.array(IngredientSchema),
        },
      },
      getForUser: {
        method: "GET",
        path: "/ingredients",
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
        pathParams: z.object({ id: StringToNumberSchema }),
        body: IngredientSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        }),
        responses: {
          200: IngredientSchema,
          404: NotFoundSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/ingredients/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: IngredientSchema || null,
          404: NotFoundSchema,
        },
      },
    },
    recipes: {
      getGlobal: {
        method: "GET",
        path: "/recipes/global",
        responses: {
          200: z.array(RecipeSchema),
        },
      },
      getForUser: {
        method: "GET",
        path: "/recipes",
        responses: {
          200: z.array(RecipeSchema),
        },
      },
      create: {
        method: "POST",
        path: "/recipes",
        body: RecipeSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true,
        }),
        responses: {
          201: RecipeSchema,
          400: NotFoundSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/recipes/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: RecipeSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        }),
        responses: {
          200: RecipeSchema,
          404: NotFoundSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/recipes/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: RecipeSchema || null,
          404: NotFoundSchema,
        },
      },
    },
    recipeIngredients: {
      create: {
        method: "POST",
        path: "/recipeIngredients",
        body: RecipeIngredientCreateSchema,
        responses: {
          201: RecipeIngredientSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/recipeIngredients/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: RecipeIngredientCreateSchema,
        responses: {
          200: RecipeIngredientSchema,
          404: NotFoundSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/recipeIngredients/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: RecipeIngredientSchema,
          404: NotFoundSchema,
        },
      },
    },
    scheduleMeals: {
      get: {
        method: "GET",
        path: "/scheduleMeals",
        responses: {
          200: z.array(ScheduleMealsSchema),
        },
      },
      create: {
        method: "POST",
        path: "/scheduleMeals",
        body: ScheduleMealsCreateSchema,
        responses: {
          201: ScheduleMealsSchema,
          400: NotFoundSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/scheduleMeals/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: ScheduleMealsUpdateSchema,
        responses: {
          200: ScheduleMealsSchema,
          404: NotFoundSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/scheduleMeals/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: ScheduleMealsSchema,
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
