import apiClient from "@/api-client";

import { TUseGetOneRecipeParams } from "./types";

const useGetOneRecipe = ({
  id,
  withIngredients = false,
}: TUseGetOneRecipeParams) => {
  const query = apiClient.recipes.getOne.useQuery([{ id }], {
    params: { id },
    query: { withIngredients },
  });

  return query;
};

export default useGetOneRecipe;
