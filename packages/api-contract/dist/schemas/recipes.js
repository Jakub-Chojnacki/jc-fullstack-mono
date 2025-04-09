"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeGetQuerySchema = exports.RecipeGetOneSchema = exports.RecipeUpdateSchema = exports.RecipeCreateSchema = exports.RecipeSchema = void 0;
var zod_1 = require("zod");
var ingredients_1 = require("./ingredients");
var utils_1 = require("./utils");
exports.RecipeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    userId: zod_1.z.number(),
    isGlobal: zod_1.z.boolean().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
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
    recipeIngredients: zod_1.z.array(ingredients_1.RecipeIngredientUpdateSchema.extend({ name: zod_1.z.string().optional() })),
});
exports.RecipeGetQuerySchema = zod_1.z.object({
    queryFilter: utils_1.GetQueryFilter.optional(),
    isDeleted: utils_1.BooleanQuerySchema.optional(),
});
