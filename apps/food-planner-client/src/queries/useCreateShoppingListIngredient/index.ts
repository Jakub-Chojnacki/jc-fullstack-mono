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
      let message = "Error adding ingredient to the list!";

      if (error.status === 400) {
        message = error.body?.message;
      }

      toast.error(message);
    },
  });

  return mutation;
}

export default useCreateShoppingListIngredient;
