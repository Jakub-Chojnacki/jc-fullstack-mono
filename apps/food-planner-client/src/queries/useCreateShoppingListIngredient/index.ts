import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useCreateShoppingListIngredient() {
  const mutation = apiClient.shoppingListIngredient.create.useMutation({
    onSuccess: () => {
      toast.success("Ingredients added to the list!");
      queryClient.invalidateQueries({ queryKey: ["shoppingListIngredients"] });
    },
    onError: (error) => {
      const message = error.status === 400 ? error.body?.message : "Error adding ingredient to the list!";
      toast.error(message);
    },
  });

  return mutation;
}

export default useCreateShoppingListIngredient;
