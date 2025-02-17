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
        getGlobal: {
            method: "GET";
            path: "/api/ingredients/global";
            responses: {
                200: z.ZodArray<z.ZodObject<{
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
                }>, "many">;
            };
        };
        getForUser: {
            method: "GET";
            path: "/api/ingredients";
            responses: {
                200: z.ZodArray<z.ZodObject<{
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
                }>, "many">;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                name: z.ZodString;
                userId: z.ZodNumber;
                isGlobal: z.ZodBoolean;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                name: string;
                userId: number;
                isGlobal: boolean;
            }, {
                name: string;
                userId: number;
                isGlobal: boolean;
            }>;
            path: "/api/ingredients";
            responses: {
                201: z.ZodObject<{
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
                isGlobal: z.ZodBoolean;
            }, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                name: string;
                isGlobal: boolean;
            }, {
                name: string;
                isGlobal: boolean;
            }>;
            path: "/api/ingredients/:id";
            responses: {
                200: z.ZodObject<{
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
            path: "/api/ingredients/:id";
            responses: {
                200: z.ZodObject<{
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
        getGlobal: {
            method: "GET";
            path: "/api/recipes/global";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodBoolean;
                    name: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }>, "many">;
            };
        };
        getForUser: {
            method: "GET";
            path: "/api/recipes";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodBoolean;
                    name: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }>, "many">;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                createdAt: z.ZodDate;
                updatedAt: z.ZodDate;
                userId: z.ZodNumber;
                isGlobal: z.ZodBoolean;
                name: z.ZodString;
                description: z.ZodString;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                description: string;
                name: string;
                userId: number;
                isGlobal: boolean;
            }, {
                description: string;
                name: string;
                userId: number;
                isGlobal: boolean;
            }>;
            path: "/api/recipes";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodBoolean;
                    name: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
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
                userId: z.ZodNumber;
                isGlobal: z.ZodBoolean;
                name: z.ZodString;
                description: z.ZodString;
            }, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                description: string;
                name: string;
                isGlobal: boolean;
            }, {
                description: string;
                name: string;
                isGlobal: boolean;
            }>;
            path: "/api/recipes/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodBoolean;
                    name: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
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
            path: "/api/recipes/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    userId: z.ZodNumber;
                    isGlobal: z.ZodBoolean;
                    name: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                }, {
                    description: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
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
                isGlobal: z.ZodBoolean;
                ingredientId: z.ZodNumber;
                recipeId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                isGlobal: boolean;
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
            }, {
                isGlobal: boolean;
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
            }>;
            path: "/api/recipeIngredients";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
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
                isGlobal: z.ZodBoolean;
                ingredientId: z.ZodNumber;
                recipeId: z.ZodNumber;
            }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                isGlobal: boolean;
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
            }, {
                isGlobal: boolean;
                amount: number;
                unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                ingredientId: number;
                recipeId: number;
            }>;
            path: "/api/recipeIngredients/:id";
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                    amount: z.ZodNumber;
                    unit: z.ZodEnum<["GRAMS", "LITERS", "MILLILITERS", "PIECES", "UNITS"]>;
                    isGlobal: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
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
                    isGlobal: z.ZodBoolean;
                    ingredientId: z.ZodNumber;
                    recipeId: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isGlobal: boolean;
                    amount: number;
                    unit: "GRAMS" | "LITERS" | "MILLILITERS" | "PIECES" | "UNITS";
                    ingredientId: number;
                    recipeId: number;
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
    scheduleMeals: {
        get: {
            method: "GET";
            path: "/api/scheduleMeals";
            responses: {
                200: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
                }>, "many">;
            };
        };
        create: {
            method: "POST";
            body: z.ZodObject<Omit<z.objectUtil.extendShape<{
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
            path: "/api/scheduleMeals";
            responses: {
                201: z.ZodObject<z.objectUtil.extendShape<{
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
                userId: z.ZodNumber;
                recipeId: z.ZodNumber;
                mealType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["BREAKFAST", "LUNCH", "DINNER", "SNACK"]>>>;
                scheduledAt: z.ZodDate;
            }>, "id" | "createdAt" | "updatedAt" | "userId">, "strip", z.ZodTypeAny, {
                recipeId: number;
                scheduledAt: Date;
                mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
            }, {
                recipeId: number;
                scheduledAt: Date;
                mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | null | undefined;
            }>;
            path: "/api/scheduleMeals/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<{
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
            path: "/api/scheduleMeals/:id";
            responses: {
                200: z.ZodObject<z.objectUtil.extendShape<{
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
