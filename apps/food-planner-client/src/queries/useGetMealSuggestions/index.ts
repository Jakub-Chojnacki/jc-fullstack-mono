import type { EMealTypes } from "@jcmono/api-contract";

import apiClient from "@/api-client";

function useGetMealSuggestions(mealType: EMealTypes) {
  const query = apiClient.scheduleMeals.getSuggestions.useQuery(
    ["mealSuggestions", mealType],
    {
      query: {
        mealType,
      },
    },
  );

  return query;
}

export default useGetMealSuggestions;
