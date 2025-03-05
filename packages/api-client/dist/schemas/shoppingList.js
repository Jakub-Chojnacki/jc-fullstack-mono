"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListUpdateSchema = exports.ShoppingListCreateSchema = exports.ShoppingListSchema = exports.ShoppingListIngredientUpdateSchema = exports.ShoppingListIngredientCreateSchema = exports.ShoppingListIngredientSchema = void 0;
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
    shoppingListId: zod_1.z.number(),
});
exports.ShoppingListIngredientCreateSchema = exports.ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.ShoppingListIngredientUpdateSchema = exports.ShoppingListIngredientSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.ShoppingListSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    userId: zod_1.z.number(),
    ingredients: zod_1.z.array(exports.ShoppingListIngredientSchema),
});
exports.ShoppingListCreateSchema = exports.ShoppingListSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.ShoppingListUpdateSchema = exports.ShoppingListSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
