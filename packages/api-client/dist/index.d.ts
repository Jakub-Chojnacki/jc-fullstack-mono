import { z } from "zod";
export declare const NotFoundSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export declare const IngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    created_at: z.ZodString;
    name: z.ZodString;
    user_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    created_at: string;
    name: string;
    user_id: number;
}, {
    id: number;
    created_at: string;
    name: string;
    user_id: number;
}>;
export type TIngredient = z.infer<typeof IngredientSchema>;
export declare const contract: {
    ingredients: {
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                created_at: z.ZodString;
                name: z.ZodString;
                user_id: z.ZodNumber;
            }, "id" | "created_at">, "strip", z.ZodTypeAny, {
                name: string;
                user_id: number;
            }, {
                name: string;
                user_id: number;
            }>;
            path: "/ingredients";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    created_at: z.ZodString;
                    name: z.ZodString;
                    user_id: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    created_at: string;
                    name: string;
                    user_id: number;
                }, {
                    id: number;
                    created_at: string;
                    name: string;
                    user_id: number;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
    };
};
