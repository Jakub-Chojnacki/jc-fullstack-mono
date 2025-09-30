import apiClient from "@/api-client";

import type { UseGetShoppingListIngredientsParams } from "./types";

function useGetShoppingListIngredients(params: UseGetShoppingListIngredientsParams = {}) {
  const { take, isDone, isDeleted } = params;

  const query = apiClient.shoppingListIngredient.get.useQuery(
    ["shoppingListIngredients", take, isDone, isDeleted],
    {
      query: {
        ...(take !== undefined && { take }),
        ...(isDone !== undefined && { isDone: isDone.toString() }),
        ...(isDeleted !== undefined && { isDeleted: isDeleted.toString() }),
      },
    },
  );

  return query;
}

export default useGetShoppingListIngredients;
