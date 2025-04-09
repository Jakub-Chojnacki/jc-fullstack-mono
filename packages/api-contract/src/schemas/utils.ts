import { z } from "zod";

export const BasePrismaSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const StringToNumberSchema = z.union([
  z.string().transform((val) => {
    const parsed = Number(val);
    if (isNaN(parsed)) {
      throw new Error("Invalid number string");
    }
    return parsed;
  }),
  z.number(),
]);

export const BooleanQuerySchema = z.preprocess(
  (val) => val === "true",
  z.boolean()
);

export const GetQueryFilter = z.enum(["USER", "GLOBAL", "ALL"]);
export type TGetQueryFilter = z.infer<typeof GetQueryFilter>;
