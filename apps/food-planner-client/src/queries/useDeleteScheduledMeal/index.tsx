import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

const useDeleteScheduledMeal = () => {
  const mutation = apiClient.scheduleMeals.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduledMeals"] });
      toast.success("Meal deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting meal.");
    },
  });

  return mutation;
};

export default useDeleteScheduledMeal;
