import { useEffect } from "react";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

import { AUTH_ME_QUERY_KEY, GC_TIME_MS, REFETCH_INTERVAL_MS } from "./const";

function useAuthMe() {
  const { mutate } = apiClient.auth.refreshToken.useMutation();

  const { isLoading, error, ...query } = apiClient.auth.me.useQuery(
    AUTH_ME_QUERY_KEY,
    {},
    {
      staleTime: GC_TIME_MS,
      refetchInterval: REFETCH_INTERVAL_MS,
      queryKey: AUTH_ME_QUERY_KEY,
      retry: false,
    },
  );

  useEffect(() => {
    if (error && !isLoading) {
      mutate({});
      queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY });
    }
  }, [isLoading, error, mutate]);

  return { isLoading, error, ...query };
}

export default useAuthMe;
