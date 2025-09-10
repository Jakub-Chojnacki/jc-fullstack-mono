import type { TGetQueryFilter } from "@jcmono/api-contract";

export type TUseGetIngredientsParams = {
  take?: number;
  page?: number;
  search?: string;
  isDeleted?: boolean;
  queryFilter?: TGetQueryFilter;
};
