"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleMealsGetSchema = exports.ScheduleMealsUpdateSchema = exports.ScheduleMealsCreateSchema = exports.ScheduleMealsSchema = exports.EMealTypes = exports.MealTypes = void 0;
var zod_1 = require("zod");
var utils_1 = require("./utils");
var recipes_1 = require("./recipes");
exports.MealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
var EMealTypes;
(function (EMealTypes) {
    EMealTypes["BREAKFAST"] = "BREAKFAST";
    EMealTypes["LUNCH"] = "LUNCH";
    EMealTypes["DINNER"] = "DINNER";
    EMealTypes["SNACK"] = "SNACK";
})(EMealTypes || (exports.EMealTypes = EMealTypes = {}));
exports.ScheduleMealsSchema = utils_1.BasePrismaSchema.extend({
    recipeId: zod_1.z.number(),
    mealType: zod_1.z.enum(exports.MealTypes).nullish(),
    scheduledAt: zod_1.z.string().datetime().or(zod_1.z.date()),
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
});
exports.ScheduleMealsGetSchema = exports.ScheduleMealsSchema.extend({
    recipe: recipes_1.RecipeSchema,
});
