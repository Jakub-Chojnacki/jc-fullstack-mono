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
        getForUser: {
            pathParams: z.ZodObject<{
                userId: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                userId: number;
            }, {
                userId: string | number;
            }>;
            method: "GET";
            path: "/api/ingredients/:userId";
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
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }>, "many">;
            };
        };
        getForUser: {
            pathParams: z.ZodObject<{
                userId: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                userId: number;
            }, {
                userId: string | number;
            }>;
            method: "GET";
            path: "/api/recipes/:userId";
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
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
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
                name: string;
                userId: number;
                isGlobal: boolean;
                description: string;
            }, {
                name: string;
                userId: number;
                isGlobal: boolean;
                description: string;
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
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
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
                name: string;
                isGlobal: boolean;
                description: string;
            }, {
                name: string;
                isGlobal: boolean;
                description: string;
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
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
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
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
                }, {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    userId: number;
                    isGlobal: boolean;
                    description: string;
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
