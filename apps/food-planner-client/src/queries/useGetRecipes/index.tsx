import apiClient from "@/api-client";

const useGetRecipes = () => {
  const query = apiClient.recipes.get.useQuery(["recipes"]);

  return query;
};

export default useGetRecipes;
