import { z } from "zod";

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
