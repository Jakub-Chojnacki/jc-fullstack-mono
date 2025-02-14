"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientCreateSchema = exports.RecipeIngredientSchema = exports.IngredientUpdateSchema = exports.IngredientCreateSchema = exports.IngredientSchema = void 0;
var zod_1 = require("zod");
exports.IngredientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    name: zod_1.z.string(),
    userId: zod_1.z.number(),
    isGlobal: zod_1.z.boolean(),
});
exports.IngredientCreateSchema = exports.IngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.IngredientUpdateSchema = exports.IngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
var QuantityUnit = [
    "GRAMS",
    "LITERS",
    "MILLILITERS",
    "PIECES",
    "UNITS",
];
exports.RecipeIngredientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    amount: zod_1.z.number(),
    unit: zod_1.z.enum(QuantityUnit),
    isGlobal: zod_1.z.boolean(),
    ingredientId: zod_1.z.number(),
    recipeId: zod_1.z.number(),
});
exports.RecipeIngredientCreateSchema = exports.RecipeIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
