"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeGetOneSchema = exports.RecipeUpdateSchema = exports.RecipeCreateSchema = exports.RecipeSchema = void 0;
var zod_1 = require("zod");
var ingredients_1 = require("./ingredients");
exports.RecipeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    userId: zod_1.z.number(),
    isGlobal: zod_1.z.boolean().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.RecipeCreateSchema = exports.RecipeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    recipeIngredients: zod_1.z.array(ingredients_1.RecipeIngredientCreateSchema.omit({ recipeId: true })),
});
exports.RecipeUpdateSchema = exports.RecipeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
}).extend({
    recipeIngredients: zod_1.z.array(ingredients_1.RecipeIngredientUpdateSchema),
});
exports.RecipeGetOneSchema = exports.RecipeSchema.extend({
    recipeIngredients: zod_1.z.array(ingredients_1.RecipeIngredientUpdateSchema),
});
