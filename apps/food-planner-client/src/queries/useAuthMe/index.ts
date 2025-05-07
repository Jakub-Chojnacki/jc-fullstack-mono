import apiClient from "@/api-client";

import { AUTH_ME_QUERY_KEY, GC_TIME_MS, REFETCH_INTERVAL_MS } from "./const";

function useAuthMe() {
  const query = apiClient.auth.me.useQuery(
    AUTH_ME_QUERY_KEY,
    {},
    {
      staleTime: GC_TIME_MS,
      refetchInterval: REFETCH_INTERVAL_MS,
      queryKey: AUTH_ME_QUERY_KEY,
    },
  );

  return query;
}

export default useAuthMe;
