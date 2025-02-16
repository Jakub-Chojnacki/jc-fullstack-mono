import { z } from "zod";
export declare const ScheduleMealsSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    userId: z.ZodNumber;
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodDate;
}>, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    recipeId: number;
    scheduledAt: Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    recipeId: number;
    scheduledAt: Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
export declare const ScheduleMealsCreateSchema: z.ZodObject<Omit<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    userId: z.ZodNumber;
    recipeId: z.ZodNumber;
    mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
    scheduledAt: z.ZodDate;
}>, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    userId: number;
    recipeId: number;
    scheduledAt: Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}, {
    userId: number;
    recipeId: number;
    scheduledAt: Date;
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
}>;
