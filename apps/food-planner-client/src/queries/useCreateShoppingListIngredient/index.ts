import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useCreateShoppingListIngredient() {
  const mutation = apiClient.shoppingListIngredient.create.useMutation({
    onSuccess: () => {
      toast.success("Ingredients added to the list!");
      queryClient.invalidateQueries({ queryKey: ["shoppingListIngredients"] });
    },
    onError: () => {
      toast.error("Error adding ingredient to the list!");
    },
  });

  return mutation;
}

export default useCreateShoppingListIngredient;
