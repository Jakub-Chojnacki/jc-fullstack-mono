import { z } from "zod";
export * from "./schemas/index";
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
            path: "/api/ingredients";
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
    auth: {
        signup: {
            method: "POST";
            body: z.ZodObject<{
                email: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                password: string;
            }, {
                email: string;
                password: string;
            }>;
            path: "/api/signup";
            responses: {
                201: z.ZodObject<{
                    access_token: z.ZodString;
                    refresh_token: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    access_token: string;
                    refresh_token: string;
                }, {
                    access_token: string;
                    refresh_token: string;
                }>;
            };
        };
        signin: {
            method: "POST";
            body: z.ZodObject<{
                email: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                password: string;
            }, {
                email: string;
                password: string;
            }>;
            path: "/api/signin";
            responses: {
                200: z.ZodObject<{
                    access_token: z.ZodString;
                    refresh_token: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    access_token: string;
                    refresh_token: string;
                }, {
                    access_token: string;
                    refresh_token: string;
                }>;
            };
        };
    };
    logout: {
        method: "POST";
        body: null;
        path: "/api/logout";
        responses: {
            200: null;
        };
    };
    refreshToken: {
        method: "POST";
        body: null;
        path: "/api/refresh";
        responses: {
            200: z.ZodObject<{
                access_token: z.ZodString;
                refresh_token: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                access_token: string;
                refresh_token: string;
            }, {
                access_token: string;
                refresh_token: string;
            }>;
        };
    };
};
