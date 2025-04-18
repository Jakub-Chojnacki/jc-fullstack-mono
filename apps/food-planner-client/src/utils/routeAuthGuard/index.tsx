import { redirect } from "@tanstack/react-router";

import apiClient from "@/api-client";
import { queryClient } from "@/main";
import { AUTH_ME_QUERY_KEY } from "@/queries/useAuthMe/const";

async function routeAuthGuard() {
  try {
    const user = await apiClient.auth.me.ensureQueryData(
      queryClient,
      AUTH_ME_QUERY_KEY,
    );

    return { user };
  }
  catch {
    throw redirect({ to: "/signin" });
  }
}

export default routeAuthGuard;
