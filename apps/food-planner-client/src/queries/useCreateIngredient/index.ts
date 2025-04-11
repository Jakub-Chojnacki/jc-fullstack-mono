import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";
import { useNavigate } from "@tanstack/react-router";

const useCreateIngredient = () => {
  const navigate = useNavigate();

  const mutation = apiClient.ingredients.create.useMutation({
    onError: () => {
      toast.error("There was an error while trying to save the ingredient!");
    },
    onSuccess: () => {
      toast.success("Ingredient added successfully!");
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      navigate({ to: "/app/ingredients" });
    },
  });

  return mutation;
};

export default useCreateIngredient;
