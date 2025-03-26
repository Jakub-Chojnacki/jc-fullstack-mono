"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.NotFoundSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var index_1 = require("./schemas/index");
var scheduleMeals_1 = require("./schemas/scheduleMeals");
__exportStar(require("./schemas/index"), exports);
var c = (0, core_1.initContract)();
exports.NotFoundSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.contract = c.router({
    ingredients: {
        getGlobal: {
            method: "GET",
            path: "/ingredients/global",
            responses: {
                200: zod_1.z.array(index_1.IngredientSchema),
            },
        },
        getForUser: {
            method: "GET",
            path: "/ingredients",
            responses: {
                200: zod_1.z.array(index_1.IngredientSchema),
            },
        },
        create: {
            method: "POST",
            path: "/ingredients",
            body: index_1.IngredientCreateSchema.omit({ userId: true }),
            responses: {
                201: index_1.IngredientSchema,
                400: exports.NotFoundSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/ingredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: index_1.IngredientSchema.omit({
                id: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            }),
            responses: {
                200: index_1.IngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/ingredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: null,
            responses: {
                200: index_1.IngredientSchema || null,
                404: exports.NotFoundSchema,
            },
        },
    },
    recipes: {
        getGlobal: {
            method: "GET",
            path: "/recipes/global",
            responses: {
                200: zod_1.z.array(index_1.RecipeSchema),
            },
        },
        getForUser: {
            method: "GET",
            path: "/recipes",
            responses: {
                200: zod_1.z.array(index_1.RecipeSchema),
            },
        },
        create: {
            method: "POST",
            path: "/recipes",
            body: index_1.RecipeCreateSchema.omit({ userId: true }),
            responses: {
                201: index_1.RecipeSchema,
                400: exports.NotFoundSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/recipes/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: index_1.RecipeSchema.omit({
                id: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            }),
            responses: {
                200: index_1.RecipeSchema,
                404: exports.NotFoundSchema,
            },
        },
        getOne: {
            method: "GET",
            path: "/recipes/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: index_1.RecipeSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/recipes/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: null,
            responses: {
                200: index_1.RecipeSchema || null,
                404: exports.NotFoundSchema,
            },
        },
    },
    recipeIngredients: {
        create: {
            method: "POST",
            path: "/recipeIngredients",
            body: index_1.RecipeIngredientCreateSchema,
            responses: {
                201: index_1.RecipeIngredientSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/recipeIngredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: index_1.RecipeIngredientCreateSchema,
            responses: {
                200: index_1.RecipeIngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/recipeIngredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: index_1.RecipeIngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
    },
    shoppingList: {
        get: {
            method: "GET",
            path: "/shoppingList",
            responses: {
                200: zod_1.z.array(index_1.ShoppingListSchema),
            },
        },
        create: {
            method: "POST",
            path: "/shoppingList",
            body: index_1.ShoppingListCreateSchema,
            responses: {
                201: index_1.ShoppingListSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/shoppingList/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: index_1.ShoppingListSchema.omit({ ingredients: true }),
                404: exports.NotFoundSchema,
            },
        },
    },
    shoppingListIngredient: {
        create: {
            method: "POST",
            path: "/shoppingListIngredient",
            body: index_1.ShoppingListIngredientCreateSchema,
            responses: {
                201: index_1.ShoppingListIngredientSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/shoppingListIngredient/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: index_1.ShoppingListIngredientUpdateSchema,
            responses: {
                200: index_1.ShoppingListIngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/shoppingListIngredient/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: index_1.ShoppingListIngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
    },
    scheduleMeals: {
        get: {
            method: "GET",
            path: "/scheduleMeals",
            responses: {
                200: zod_1.z.array(scheduleMeals_1.ScheduleMealsSchema),
            },
        },
        create: {
            method: "POST",
            path: "/scheduleMeals",
            body: scheduleMeals_1.ScheduleMealsCreateSchema,
            responses: {
                201: scheduleMeals_1.ScheduleMealsSchema,
                400: exports.NotFoundSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/scheduleMeals/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: scheduleMeals_1.ScheduleMealsUpdateSchema,
            responses: {
                200: scheduleMeals_1.ScheduleMealsSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/scheduleMeals/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: scheduleMeals_1.ScheduleMealsSchema,
                404: exports.NotFoundSchema,
            },
        },
    },
    auth: {
        signup: {
            method: "POST",
            path: "/auth/signup",
            body: index_1.LoginSchema,
            responses: {
                201: zod_1.z.string(),
            },
        },
        signin: {
            method: "POST",
            path: "/auth/signin",
            body: index_1.LoginSchema,
            responses: {
                200: zod_1.z.string(),
            },
        },
        me: {
            method: "GET",
            path: "/auth/me",
            responses: {
                200: index_1.UserSchema,
                404: exports.NotFoundSchema,
            },
        },
        refreshToken: {
            method: "POST",
            path: "/auth/refresh",
            body: null,
            responses: {
                200: zod_1.z.string(),
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
}, {
    pathPrefix: "/api",
});
