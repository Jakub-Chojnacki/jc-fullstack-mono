import apiClient from "@/api-client";

import type { TUseGetScheduledMealsParams } from "./types";

function useGetScheduledMeals({
  query: { startDate, endDate },
}: TUseGetScheduledMealsParams) {
  const query = apiClient.scheduleMeals.get.useQuery(["scheduledMeals"], {
    query: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    },
  });

  return query;
}

export default useGetScheduledMeals;
