import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

const useCreateScheduledMeal = () => {
  const mutation = apiClient.scheduleMeals.create.useMutation({
    onSuccess: () => {
      toast.success("Meal scheduled successfully!");
      queryClient.invalidateQueries({ queryKey: ["scheduleMeals"] });
    },
    onError: () => {
      toast.error("Error scheduling a meal!");
    },
  });

  return mutation;
};

export default useCreateScheduledMeal;
