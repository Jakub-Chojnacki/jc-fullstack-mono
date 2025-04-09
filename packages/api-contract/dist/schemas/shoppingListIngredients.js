"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListIngredientUpdateSchema = exports.ShoppingListIngredientCreateSchema = exports.ShoppingListIngredientSchema = void 0;
var zod_1 = require("zod");
var ingredients_1 = require("./ingredients");
exports.ShoppingListIngredientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    amount: zod_1.z.number(),
    unit: zod_1.z.enum(ingredients_1.QuantityUnit),
    isDone: zod_1.z.boolean(),
    ingredientId: zod_1.z.number(),
    userId: zod_1.z.number(),
});
exports.ShoppingListIngredientCreateSchema = exports.ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
exports.ShoppingListIngredientUpdateSchema = exports.ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
