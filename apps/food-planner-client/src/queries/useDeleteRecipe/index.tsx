import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

const useDeleteRecipe = () => {
  const mutation = apiClient.recipes.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe deleted successfully.");
    },
  });

  return mutation;
};

export default useDeleteRecipe;
