import { z } from "zod";
export declare const MealTypes: readonly ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
export declare enum EMealTypes {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    SNACK = "SNACK"
}
export declare const ScheduleMealsSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}>, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
export declare const ScheduleMealsCreateSchema: z.ZodObject<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}>, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
export declare const ScheduleMealsUpdateSchema: z.ZodObject<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}>, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    recipeId: number;
    scheduledAt: string | Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
export declare const ScheduleMealsGetSchema: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}>, {
    recipe: z.ZodObject<{
        id: z.ZodNumber;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        userId: z.ZodNumber;
        isGlobal: z.ZodOptional<z.ZodBoolean>;
        name: z.ZodString;
        description: z.ZodString;
        isDeleted: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        name: string;
        description: string;
        isGlobal?: boolean | undefined;
        isDeleted?: boolean | undefined;
    }, {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        name: string;
        description: string;
        isGlobal?: boolean | undefined;
        isDeleted?: boolean | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    recipeId: number;
    scheduledAt: string | Date;
    recipe: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        name: string;
        description: string;
        isGlobal?: boolean | undefined;
        isDeleted?: boolean | undefined;
    };
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    recipeId: number;
    scheduledAt: string | Date;
    recipe: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        name: string;
        description: string;
        isGlobal?: boolean | undefined;
        isDeleted?: boolean | undefined;
    };
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
export type TScheduleMeals = z.infer<typeof ScheduleMealsSchema>;
export type TScheduleMealsCreate = z.infer<typeof ScheduleMealsCreateSchema>;
export type TScheduleMealsUpdate = z.infer<typeof ScheduleMealsUpdateSchema>;
