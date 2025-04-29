import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useUpdateShoppingListIngredient() {
  const mutation = apiClient.shoppingListIngredient.update.useMutation({
    onError: () => {
      toast.error("There was an error while trying to update the ingredient!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListIngredients"] });
    },
  });

  return mutation;
}

export default useUpdateShoppingListIngredient;
