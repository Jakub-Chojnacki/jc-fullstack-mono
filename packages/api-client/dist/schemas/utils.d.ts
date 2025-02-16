import { z } from "zod";
export declare const BasePrismaSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const StringToNumberSchema: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
