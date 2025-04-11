import apiClient from "@/api-client";

const useGetIngredients = () => {
  const query = apiClient.ingredients.get.useQuery(["ingredients"]);

  return query;
};

export default useGetIngredients;
