import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useDeleteShoppingListIngredient() {
  const mutation = apiClient.shoppingListIngredient.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListIngredients"] });
      toast.success("Ingredient deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting ingredient from the list.");
    },
  });

  return mutation;
}

export default useDeleteShoppingListIngredient;
