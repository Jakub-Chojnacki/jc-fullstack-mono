"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeUpdateSchema = exports.RecipeCreateSchema = exports.RecipeSchema = void 0;
var zod_1 = require("zod");
exports.RecipeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    userId: zod_1.z.number(),
    isGlobal: zod_1.z.boolean(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.RecipeCreateSchema = exports.RecipeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.RecipeUpdateSchema = exports.RecipeSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
