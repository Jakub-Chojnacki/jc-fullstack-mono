import apiClient from "@/api-client";

import type { TUseGetRecipesParams } from "./types";

function useGetRecipes({
  page = 1,
  take = 20,
  search,
}: TUseGetRecipesParams) {
  const query = apiClient.recipes.get.useQuery(
    ["recipes", page, take, search],
    {
      query: {
        page: page.toString(),
        take: take.toString(),
        ...(search && search.trim() && { search: search.trim() }),
      },
    },
  );

  return query;
}

export default useGetRecipes;
