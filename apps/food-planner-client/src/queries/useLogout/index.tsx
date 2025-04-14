import { useNavigate } from "@tanstack/react-router";

import { AUTH_ME_QUERY_KEY } from "@queries/useAuthMe/const";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

function useLogout() {
  const navigate = useNavigate();

  const mutation = apiClient.auth.logout.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY });
      queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
      return navigate({ to: "/signin" });
    },
  });

  return mutation;
}

export default useLogout;
