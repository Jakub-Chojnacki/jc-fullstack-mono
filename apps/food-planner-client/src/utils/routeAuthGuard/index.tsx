import { redirect } from "@tanstack/react-router";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

import { AUTH_ME_QUERY_KEY } from "@/queries/useAuthMe/const";

const routeAuthGuard = async () => {
  try {
    const user = await apiClient.auth.me.ensureQueryData(queryClient, AUTH_ME_QUERY_KEY);

    return { user };
  } catch (err) {
    throw redirect({ to: "/signin" });
  }
};

export default routeAuthGuard;
