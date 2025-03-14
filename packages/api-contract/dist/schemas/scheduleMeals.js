"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleMealsUpdateSchema = exports.ScheduleMealsCreateSchema = exports.ScheduleMealsSchema = void 0;
var zod_1 = require("zod");
var utils_1 = require("./utils");
var MealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
exports.ScheduleMealsSchema = utils_1.BasePrismaSchema.extend({
    userId: zod_1.z.number(),
    recipeId: zod_1.z.number(),
    mealType: zod_1.z.enum(MealTypes).nullish(),
    scheduledAt: zod_1.z.date(),
});
exports.ScheduleMealsCreateSchema = exports.ScheduleMealsSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.ScheduleMealsUpdateSchema = exports.ScheduleMealsSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
});
