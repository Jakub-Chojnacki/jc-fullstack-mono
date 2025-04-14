import apiClient from "@/api-client";

function useGetRecipes() {
  const query = apiClient.recipes.get.useQuery(["recipes"]);

  return query;
}

export default useGetRecipes;
