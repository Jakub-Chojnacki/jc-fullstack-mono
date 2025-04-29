import apiClient from "@/api-client";

function useGetShoppingListIngredients() {
  const query = apiClient.shoppingListIngredient.get.useQuery(["shoppingListIngredients"]);

  return query;
}

export default useGetShoppingListIngredients;
