import { z } from "zod";
export * from "./schemas/index";
export declare const NotFoundSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export declare const contract: {
    ingredients: {
        get: {
            query: z.ZodObject<{
                queryFilter: z.ZodOptional<z.ZodEnum<["USER", "GLOBAL", "ALL"]>>;
                isDeleted: z.ZodOptional<z.ZodEffects<z.ZodBoolean, boolean, unknown>>;
            }, "strip", z.ZodTypeAny, {
                isDeleted?: boolean | undefined;
                queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
            }, {
                isDeleted?: unknown;
                queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
            }>;
            method: "GET";
            path: "/api/ingredients";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    name: z.ZodString;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    isDeleted: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }>, "many">;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                name: z.ZodString;
                userId: z.ZodNumber;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                isDeleted: z.ZodOptional<z.ZodBoolean>;
            }, "id" | "createdAt" | "updatedAt">, "userId">, "strip", z.ZodTypeAny, {
                name: string;
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }, {
                name: string;
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }>;
            path: "/api/ingredients";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    name: z.ZodString;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    isDeleted: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }>;
                400: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "PUT";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                name: z.ZodString;
                userId: z.ZodNumber;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                isDeleted: z.ZodOptional<z.ZodBoolean>;
            }, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                name: string;
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }, {
                name: string;
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }>;
            path: "/api/ingredients/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    name: z.ZodString;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    isDeleted: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
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
        delete: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "DELETE";
            body: null;
            path: "/api/ingredients/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    name: z.ZodString;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    isDeleted: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
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
    recipes: {
        get: {
            query: z.ZodObject<{
                queryFilter: z.ZodOptional<z.ZodEnum<["USER", "GLOBAL", "ALL"]>>;
                isDeleted: z.ZodOptional<z.ZodEffects<z.ZodBoolean, boolean, unknown>>;
            }, "strip", z.ZodTypeAny, {
                isDeleted?: boolean | undefined;
                queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
            }, {
                isDeleted?: unknown;
                queryFilter?: "USER" | "GLOBAL" | "ALL" | undefined;
            }>;
            method: "GET";
            path: "/api/recipes";
            responses: {
                200: z.ZodArray<z.ZodObject<{
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
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }>, "many">;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<z.objectUtil.extendShape<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                userId: z.ZodNumber;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                name: z.ZodString;
                description: z.ZodString;
                isDeleted: z.ZodOptional<z.ZodBoolean>;
            }, "id" | "createdAt" | "updatedAt">, {
                recipeIngredients: z.ZodArray<z.ZodObject<Omit<Omit<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "id" | "createdAt" | "updatedAt">, "recipeId">, "strip", z.ZodTypeAny, {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isGlobal?: boolean | undefined;
                }, {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isGlobal?: boolean | undefined;
                }>, "many">;
            }>, "userId">, "strip", z.ZodTypeAny, {
                name: string;
                description: string;
                recipeIngredients: {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isGlobal?: boolean | undefined;
                }[];
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }, {
                name: string;
                description: string;
                recipeIngredients: {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isGlobal?: boolean | undefined;
                }[];
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }>;
            path: "/api/recipes";
            responses: {
                201: z.ZodObject<{
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
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }>;
                400: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "PUT";
            body: z.ZodObject<z.objectUtil.extendShape<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                userId: z.ZodNumber;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                name: z.ZodString;
                description: z.ZodString;
                isDeleted: z.ZodOptional<z.ZodBoolean>;
            }, "id" | "createdAt" | "updatedAt" | "userId">, {
                recipeIngredients: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<Omit<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "createdAt" | "updatedAt" | "recipeId">, {
                    id: z.ZodOptional<z.ZodNumber>;
                }>, "strip", z.ZodTypeAny, {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    id?: number | undefined;
                    isGlobal?: boolean | undefined;
                }, {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    id?: number | undefined;
                    isGlobal?: boolean | undefined;
                }>, "many">;
            }>, "strip", z.ZodTypeAny, {
                name: string;
                description: string;
                recipeIngredients: {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    id?: number | undefined;
                    isGlobal?: boolean | undefined;
                }[];
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }, {
                name: string;
                description: string;
                recipeIngredients: {
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    id?: number | undefined;
                    isGlobal?: boolean | undefined;
                }[];
                isGlobal?: boolean | undefined;
                isDeleted?: boolean | undefined;
            }>;
            path: "/api/recipes/:id";
            responses: {
                200: z.ZodObject<{
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
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
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
        getOne: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            query: z.ZodObject<{
                withIngredients: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                withIngredients?: string | undefined;
            }, {
                withIngredients?: string | undefined;
            }>;
            method: "GET";
            path: "/api/recipes/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    name: z.ZodString;
                    description: z.ZodString;
                    isDeleted: z.ZodOptional<z.ZodBoolean>;
                }, {
                    recipeIngredients: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<Omit<{
                        id: z.ZodNumber;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodDate;
                        amount: z.ZodNumber;
                        unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                        isGlobal: z.ZodOptional<z.ZodBoolean>;
                        ingredientId: z.ZodNumber;
                        recipeId: z.ZodNumber;
                    }, "createdAt" | "updatedAt" | "recipeId">, {
                        id: z.ZodOptional<z.ZodNumber>;
                    }>, {
                        name: z.ZodOptional<z.ZodString>;
                    }>, "strip", z.ZodTypeAny, {
                        amount: number;
                        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                        ingredientId: number;
                        id?: number | undefined;
                        name?: string | undefined;
                        isGlobal?: boolean | undefined;
                    }, {
                        amount: number;
                        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                        ingredientId: number;
                        id?: number | undefined;
                        name?: string | undefined;
                        isGlobal?: boolean | undefined;
                    }>, "many">;
                }>, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    recipeIngredients: {
                        amount: number;
                        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                        ingredientId: number;
                        id?: number | undefined;
                        name?: string | undefined;
                        isGlobal?: boolean | undefined;
                    }[];
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    recipeIngredients: {
                        amount: number;
                        unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                        ingredientId: number;
                        id?: number | undefined;
                        name?: string | undefined;
                        isGlobal?: boolean | undefined;
                    }[];
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
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
        delete: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "DELETE";
            body: null;
            path: "/api/recipes/:id";
            responses: {
                200: z.ZodObject<{
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
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    description: string;
                    isGlobal?: boolean | undefined;
                    isDeleted?: boolean | undefined;
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
    recipeIngredients: {
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                amount: z.ZodNumber;
                unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                ingredientId: z.ZodNumber;
                recipeId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
                isGlobal?: boolean | undefined;
            }, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
                isGlobal?: boolean | undefined;
            }>;
            path: "/api/recipeIngredients";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
                }>;
            };
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "PUT";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                amount: z.ZodNumber;
                unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                isGlobal: z.ZodOptional<z.ZodBoolean>;
                ingredientId: z.ZodNumber;
                recipeId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
                isGlobal?: boolean | undefined;
            }, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
                isGlobal?: boolean | undefined;
            }>;
            path: "/api/recipeIngredients/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
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
        delete: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "DELETE";
            path: "/api/recipeIngredients/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodOptional<z.ZodBoolean>;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                    isGlobal?: boolean | undefined;
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
    shoppingListIngredient: {
        get: {
            query: z.ZodObject<{
                isDone: z.ZodOptional<z.ZodEffects<z.ZodBoolean, boolean, unknown>>;
            }, "strip", z.ZodTypeAny, {
                isDone?: boolean | undefined;
            }, {
                isDone?: unknown;
            }>;
            method: "GET";
            path: "/api/shoppingListIngredient";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isDone: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    userId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
                }>, "many">;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                amount: z.ZodNumber;
                unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                isDone: z.ZodBoolean;
                ingredientId: z.ZodNumber;
                userId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                isDone: boolean;
            }, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                isDone: boolean;
            }>;
            path: "/api/shoppingListIngredient";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isDone: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    userId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
                }>;
            };
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "PUT";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                amount: z.ZodNumber;
                unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                isDone: z.ZodBoolean;
                ingredientId: z.ZodNumber;
                userId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                isDone: boolean;
            }, {
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                isDone: boolean;
            }>;
            path: "/api/shoppingListIngredient/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isDone: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    userId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: number;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    isDone: boolean;
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
        delete: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "DELETE";
            path: "/api/shoppingListIngredient/:id";
            responses: {
                200: null;
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
    scheduleMeals: {
        get: {
            query: z.ZodObject<{
                startDate: z.ZodString;
                endDate: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                startDate: string;
                endDate: string;
            }, {
                startDate: string;
                endDate: string;
            }>;
            method: "GET";
            path: "/api/scheduleMeals";
            responses: {
                200: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
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
                        name: string;
                        userId: number;
                        description: string;
                        isGlobal?: boolean | undefined;
                        isDeleted?: boolean | undefined;
                    }, {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        userId: number;
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
                        name: string;
                        userId: number;
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
                        name: string;
                        userId: number;
                        description: string;
                        isGlobal?: boolean | undefined;
                        isDeleted?: boolean | undefined;
                    };
                    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
                }>, "many">;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        getById: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "GET";
            path: "/api/scheduleMeals/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
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
                        name: string;
                        userId: number;
                        description: string;
                        isGlobal?: boolean | undefined;
                        isDeleted?: boolean | undefined;
                    }, {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        userId: number;
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
                        name: string;
                        userId: number;
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
                        name: string;
                        userId: number;
                        description: string;
                        isGlobal?: boolean | undefined;
                        isDeleted?: boolean | undefined;
                    };
                    mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
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
        create: {
            method: "POST";
            body: z.ZodObject<Omit<z.objectUtil.extendShape<{
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
            path: "/api/scheduleMeals";
            responses: {
                201: z.ZodObject<z.objectUtil.extendShape<{
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
                400: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "PUT";
            body: z.ZodObject<Omit<z.objectUtil.extendShape<{
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
            path: "/api/scheduleMeals/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<{
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
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
        };
        delete: {
            pathParams: z.ZodObject<{
                id: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: string | number;
            }>;
            method: "DELETE";
            body: null;
            path: "/api/scheduleMeals/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<{
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
            path: "/api/auth/signup";
            responses: {
                201: z.ZodString;
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
            path: "/api/auth/signin";
            responses: {
                200: z.ZodString;
            };
        };
        me: {
            method: "GET";
            path: "/api/auth/me";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    email: z.ZodString;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    name: string;
                    email: string;
                }, {
                    id: number;
                    name: string;
                    email: string;
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
        refreshToken: {
            method: "POST";
            body: null;
            path: "/api/auth/refresh";
            responses: {
                200: z.ZodString;
            };
        };
        logout: {
            method: "POST";
            body: null;
            path: "/api/auth/logout";
            responses: {
                200: null;
            };
        };
    };
};
