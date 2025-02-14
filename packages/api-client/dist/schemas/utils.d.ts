import { z } from "zod";
export declare const StringToNumberSchema: z.ZodUnion<[z.ZodEffects<z.ZodString, number, string>, z.ZodNumber]>;
