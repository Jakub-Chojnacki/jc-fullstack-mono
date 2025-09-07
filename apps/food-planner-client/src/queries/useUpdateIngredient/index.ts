import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useUpdateIngredient() {
  const navigate = useNavigate();

  const mutation = apiClient.ingredients.update.useMutation({
    onError: () => {
      toast.error("There was an error while trying to update the ingredient!");
    },
    onSuccess: () => {
      toast.success("Ingredient updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      navigate({ to: "/app/ingredients" });
    },
  });

  return mutation;
}

export default useUpdateIngredient;
