import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useShoppingListFromMeal() {
  const mutation
    = apiClient.shoppingListIngredient.createFromRecipe.useMutation({
      onError: () => {
        toast.error(
          "There was an error while trying to create a shopping list!",
        );
      },
      onSuccess: () => {
        toast.success("Ingredients were added to the shopping list!");
        queryClient.invalidateQueries({
          queryKey: ["shoppingListIngredients"],
        });
      },
    });

  return mutation;
}

export default useShoppingListFromMeal;
