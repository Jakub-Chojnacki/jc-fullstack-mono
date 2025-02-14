"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientSchema = void 0;
var zod_1 = require("zod");
exports.IngredientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    name: zod_1.z.string(),
    userId: zod_1.z.number(),
    isGlobal: zod_1.z.boolean(),
});
