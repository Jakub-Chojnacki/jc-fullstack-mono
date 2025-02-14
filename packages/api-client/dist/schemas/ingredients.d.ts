import { z } from "zod";
export declare const IngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodString;
    userId: z.ZodNumber;
    isGlobal: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal: boolean;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    isGlobal: boolean;
}>;
export type TIngredient = z.infer<typeof IngredientSchema>;
