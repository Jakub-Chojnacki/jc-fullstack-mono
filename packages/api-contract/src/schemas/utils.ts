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

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export type TErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const PaginationSchema = z.object({
  page: z.string().optional(),
  take: z.string().optional(),
});

export type TPagination = z.infer<typeof PaginationSchema>;

export const PaginationMetaSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  itemsPerPage: z.number(),
});

export type TPaginationMeta = z.infer<typeof PaginationMetaSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    data: z.array(itemSchema),
    pagination: PaginationMetaSchema,
  });

export type TPaginatedResponse<T> = {
  data: T[];
  pagination: TPaginationMeta;
};

// Helper type for frontend to extract data type from paginated response
export type TDataFromPaginated<T> =
  T extends TPaginatedResponse<infer U> ? U : never;

export const ImageUploadSchema = z
  .custom<File>((val) => val instanceof File, "File is required")
  .refine((file) => !file || file.type === "image/jpeg", {
    message: "Only JPEG images are allowed",
  })
  .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
    message: "Max size is 5MB",
  })
  .optional();
