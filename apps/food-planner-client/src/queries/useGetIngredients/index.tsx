import apiClient from "@/api-client";

import type { TUseGetIngredientsParams } from "./types";

function useGetIngredients({
  page = 1,
  take = 20,
  search,
  isDeleted,
}: TUseGetIngredientsParams = {}) {
  const query = apiClient.ingredients.get.useQuery(
    ["ingredients", page, take, search, isDeleted],
    {
      query: {
        page: page.toString(),
        take: take.toString(),
        ...(search && search.trim() && { search: search.trim() }),
        ...(isDeleted !== undefined && { isDeleted: isDeleted.toString() }),
      },
    },
  );

  return query;
}

export default useGetIngredients;
