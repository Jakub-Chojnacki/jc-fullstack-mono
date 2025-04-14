import apiClient from "@/api-client";

import type { TUseGetOneRecipeParams } from "./types";

function useGetOneRecipe({
  id,
  withIngredients = false,
}: TUseGetOneRecipeParams) {
  const query = apiClient.recipes.getOne.useQuery([{ id }], {
    params: { id },
    query: { withIngredients },
  });

  return query;
}

export default useGetOneRecipe;
