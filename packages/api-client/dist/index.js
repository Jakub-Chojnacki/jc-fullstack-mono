"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.NotFoundSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var index_1 = require("./schemas/index");
__exportStar(require("./schemas/index"), exports);
var c = (0, core_1.initContract)();
exports.NotFoundSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.contract = c.router({
    ingredients: {
        getGlobal: {
            method: "GET",
            path: "/ingredients",
            responses: {
                200: zod_1.z.array(index_1.IngredientSchema),
            },
        },
        getForUser: {
            method: "GET",
            path: "/ingredients/:userId",
            pathParams: zod_1.z.object({ userId: index_1.StringToNumberSchema }),
            responses: {
                200: zod_1.z.array(index_1.IngredientSchema),
            },
        },
        create: {
            method: "POST",
            path: "/ingredients",
            body: index_1.IngredientSchema.omit({
                id: true,
                createdAt: true,
                updatedAt: true,
            }),
            responses: {
                201: index_1.IngredientSchema,
                400: exports.NotFoundSchema,
            },
        },
        update: {
            method: "PUT",
            path: "/ingredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            body: index_1.IngredientSchema.omit({
                id: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            }),
            responses: {
                200: index_1.IngredientSchema,
                404: exports.NotFoundSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/ingredients/:id",
            pathParams: zod_1.z.object({ id: index_1.StringToNumberSchema }),
            responses: {
                200: index_1.IngredientSchema || null,
                404: exports.NotFoundSchema,
            },
        },
    },
    auth: {
        signup: {
            method: "POST",
            path: "/signup",
            body: index_1.LoginSchema,
            responses: {
                201: index_1.TokensSchema,
            },
        },
        signin: {
            method: "POST",
            path: "/signin",
            body: index_1.LoginSchema,
            responses: {
                200: index_1.TokensSchema,
            },
        },
    },
    logout: {
        method: "POST",
        path: "/logout",
        body: null,
        responses: {
            200: null,
        },
    },
    refreshToken: {
        method: "POST",
        path: "/refresh",
        body: null,
        responses: {
            200: index_1.TokensSchema,
        },
    },
}, {
    pathPrefix: "/api",
});
