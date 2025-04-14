import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useDeleteIngredient() {
  const mutation = apiClient.ingredients.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      toast.success("Ingredient deleted successfully.");
    },
  });

  return mutation;
}

export default useDeleteIngredient;
