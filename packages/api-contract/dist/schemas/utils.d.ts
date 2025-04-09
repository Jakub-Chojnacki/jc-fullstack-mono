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
export declare const BooleanQuerySchema: z.ZodEffects<z.ZodBoolean, boolean, unknown>;
export declare const GetQueryFilter: z.ZodEnum<["USER", "GLOBAL", "ALL"]>;
export type TGetQueryFilter = z.infer<typeof GetQueryFilter>;
