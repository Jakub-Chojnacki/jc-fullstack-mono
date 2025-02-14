"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToNumberSchema = void 0;
var zod_1 = require("zod");
exports.StringToNumberSchema = zod_1.z.union([
    zod_1.z.string().transform(function (val) {
        var parsed = Number(val);
        if (isNaN(parsed)) {
            throw new Error("Invalid number string");
        }
        return parsed;
    }),
    zod_1.z.number(),
]);
