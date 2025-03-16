import { redirect } from "@tanstack/react-router";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

import { AUTH_ME_QUERY_KEY } from "@/queries/useAuthMe/const";

const redirectLoggedUser = async () => {
  try {
    const user = await apiClient.auth.me.ensureQueryData(queryClient, AUTH_ME_QUERY_KEY);

    if (user) {
      return redirect({ to: "/app" });
    }
  } catch (err) {
    return null;
  }
};

export default redirectLoggedUser;
