import apiClient from "@/api-client";

import type { TUseGetRecipesParams } from "./types";

function useGetRecipes({
  page = 1,
  take = 20,
  search,
  isDeleted,
  queryFilter,
}: TUseGetRecipesParams) {
  const query = apiClient.recipes.get.useQuery(
    ["recipes", page, take, search, isDeleted, queryFilter],
    {
      query: {
        page: page.toString(),
        take: take.toString(),
        ...(search && search.trim() && { search: search.trim() }),
        ...(isDeleted !== undefined && { isDeleted: isDeleted.toString() }),
        ...(queryFilter && { queryFilter }),
      },
    },
  );

  return query;
}

export default useGetRecipes;
