import type { TIngredient } from "@jcmono/api-contract";

import apiClient from "@/api-client";

function useGetOneIngredient(id: number) {
  const query = apiClient.ingredients.get.useQuery(["ingredients"], {});

  const ingredient = query.data?.body.data.find((ingredient: TIngredient) => ingredient.id === id);

  return {
    ...query,
    data: ingredient ? { body: ingredient } : null,
  };
}

export default useGetOneIngredient;
