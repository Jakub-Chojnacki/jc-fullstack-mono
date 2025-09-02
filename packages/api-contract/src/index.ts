import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  BooleanQuerySchema,
  ErrorResponseSchema,
  IngredientCreateSchema,
  IngredientGetQuerySchema,
  IngredientSchema,
  LoginSchema,
  PaginatedResponseSchema,
  RecipeCreateSchema,
  RecipeGetOneSchema,
  RecipeGetQuerySchema,
  RecipeIngredientCreateSchema,
  RecipeIngredientSchema,
  RecipeIngredientUpdateSchema,
  RecipeSchema,
  ShoppingListIngredientCreateSchema,
  ShoppingListIngredientGetQuerySchema,
  ShoppingListIngredientGetSchema,
  ShoppingListIngredientSchema,
  ShoppingListIngredientUpdateSchema,
  StringToNumberSchema,
  UserSchema,
} from "./schemas/index";
import {
  ScheduleMealsCreateSchema,
  ScheduleMealsGetSchema,
  ScheduleMealsSchema,
  ScheduleMealsUpdateSchema,
} from "./schemas/scheduleMeals";

export * from "./schemas/index";

const c = initContract();

export const contract = c.router(
  {
    ingredients: {
      get: {
        method: "GET",
        path: "/ingredients",
        query: IngredientGetQuerySchema,
        responses: {
          200: PaginatedResponseSchema(IngredientSchema),
        },
      },
      create: {
        method: "POST",
        path: "/ingredients",
        body: IngredientCreateSchema.omit({ userId: true }),
        responses: {
          201: IngredientSchema,
          400: ErrorResponseSchema,
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
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/ingredients/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: null,
        responses: {
          200: IngredientSchema || null,
          404: ErrorResponseSchema,
        },
      },
    },
    recipes: {
      get: {
        method: "GET",
        path: "/recipes",
        query: RecipeGetQuerySchema,
        responses: {
          200: PaginatedResponseSchema(RecipeSchema),
        },
      },
      create: {
        method: "POST",
        path: "/recipes",
        body: RecipeCreateSchema.omit({ userId: true }),
        responses: {
          201: RecipeSchema,
          400: ErrorResponseSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/recipes/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: RecipeSchema.omit({
          createdAt: true,
          updatedAt: true,
          id: true,
          userId: true,
        }).extend({
          recipeIngredients: z.array(RecipeIngredientUpdateSchema),
        }),
        responses: {
          200: RecipeSchema,
          404: ErrorResponseSchema,
        },
      },
      getOne: {
        method: "GET",
        path: "/recipes/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        query: z.object({
          withIngredients: BooleanQuerySchema.optional(),
        }),
        responses: {
          200: RecipeGetOneSchema,
          404: ErrorResponseSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/recipes/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: null,
        responses: {
          200: RecipeSchema || null,
          404: ErrorResponseSchema,
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
          404: ErrorResponseSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/recipeIngredients/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: RecipeIngredientSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    shoppingListIngredient: {
      get: {
        method: "GET",
        path: "/shoppingListIngredient",
        query: ShoppingListIngredientGetQuerySchema,
        responses: {
          200: z.array(ShoppingListIngredientGetSchema),
          404: ErrorResponseSchema,
          400: ErrorResponseSchema,

        },
      },
      create: {
        method: "POST",
        path: "/shoppingListIngredient",
        body: ShoppingListIngredientCreateSchema,
        responses: {
          201: ShoppingListIngredientSchema,
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,

        },
      },
      createFromRecipe: {
        method: "POST",
        path: "/shoppingListIngredient/recipe/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: null,
        responses: {
          201: z.array(ShoppingListIngredientSchema),
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/shoppingListIngredient/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: ShoppingListIngredientUpdateSchema,
        responses: {
          200: ShoppingListIngredientSchema,
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/shoppingListIngredient/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: null,
        responses: {
          200: null,
          400: ErrorResponseSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    scheduleMeals: {
      get: {
        method: "GET",
        path: "/scheduleMeals",
        query: z.object({
          startDate: z.string(),
          endDate: z.string(),
        }),
        responses: {
          200: z.array(ScheduleMealsGetSchema),
          404: ErrorResponseSchema,
        },
      },
      getSuggestions: {
        method: "GET",
        path: "/scheduleMeals/suggestions",
        query: z.object({
          mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
        }),
        responses: {
          200: z.array(RecipeSchema).max(3),
          404: ErrorResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/scheduleMeals/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        responses: {
          200: ScheduleMealsGetSchema,
          404: ErrorResponseSchema,
        },
      },
      create: {
        method: "POST",
        path: "/scheduleMeals",
        body: ScheduleMealsCreateSchema,
        responses: {
          201: ScheduleMealsSchema,
          400: ErrorResponseSchema,
        },
      },
      update: {
        method: "PUT",
        path: "/scheduleMeals/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: ScheduleMealsUpdateSchema,
        responses: {
          200: ScheduleMealsSchema,
          404: ErrorResponseSchema,
        },
      },
      delete: {
        method: "DELETE",
        path: "/scheduleMeals/:id",
        pathParams: z.object({ id: StringToNumberSchema }),
        body: null,
        responses: {
          200: ScheduleMealsSchema,
          404: ErrorResponseSchema,
        },
      },
    },
    auth: {
      signup: {
        method: "POST",
        path: "/auth/signup",
        body: LoginSchema,
        responses: {
          201: z.string(),
        },
      },
      signin: {
        method: "POST",
        path: "/auth/signin",
        body: LoginSchema,
        responses: {
          200: z.string(),
        },
      },
      me: {
        method: "GET",
        path: "/auth/me",
        responses: {
          200: UserSchema,
          404: ErrorResponseSchema,
        },
      },
      refreshToken: {
        method: "POST",
        path: "/auth/refresh",
        body: null,
        responses: {
          200: z.string(),
        },
      },
      logout: {
        method: "POST",
        path: "/auth/logout",
        body: null,
        responses: {
          200: null,
        },
      },
    },
  },
  {
    pathPrefix: "/api",
  }
);
