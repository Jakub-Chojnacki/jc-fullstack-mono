"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensSchema = exports.LoginSchema = void 0;
var zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.TokensSchema = zod_1.z.object({
    access_token: zod_1.z.string(),
    refresh_token: zod_1.z.string(),
});
