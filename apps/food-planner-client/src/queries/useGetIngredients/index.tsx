import apiClient from "@/api-client";

function useGetIngredients() {
  const query = apiClient.ingredients.get.useQuery(["ingredients"]);

  return query;
}

export default useGetIngredients;
