"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.IngredientSchema = exports.NotFoundSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
exports.NotFoundSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.IngredientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    created_at: zod_1.z.string(),
    name: zod_1.z.string(),
    user_id: zod_1.z.number(),
});
exports.contract = c.router({
    ingredients: {
        create: {
            method: "POST",
            path: "/ingredients",
            body: exports.IngredientSchema.omit({ id: true, created_at: true }),
            responses: {
                201: exports.IngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
    },
});
