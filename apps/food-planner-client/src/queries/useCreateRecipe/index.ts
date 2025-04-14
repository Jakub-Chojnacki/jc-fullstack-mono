import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useCreateRecipe() {
  const navigate = useNavigate();

  const mutation = apiClient.recipes.create.useMutation({
    onError: () => {
      toast.error("There was an error while trying to save the recipe!");
    },
    onSuccess: () => {
      toast.success("Recipe added successfully!");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate({ to: "/app/recipes" });
    },
  });

  return mutation;
}

export default useCreateRecipe;
