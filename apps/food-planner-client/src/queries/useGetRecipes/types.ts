import type { TGetQueryFilter } from "@jcmono/api-contract";

export type TUseGetRecipesParams = {
  take: number;
  page: number;
  search?: string;
  isDeleted?: boolean;
  queryFilter?: TGetQueryFilter;
};
