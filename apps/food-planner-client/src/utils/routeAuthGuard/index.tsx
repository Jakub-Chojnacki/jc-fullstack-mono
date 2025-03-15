import { redirect } from "@tanstack/react-router";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

const routeAuthGuard = async () => {
  try {
    const user = await apiClient.auth.me.ensureQueryData(queryClient, ["me"]);

    return { user };
  } catch (err) {
    throw redirect({ to: "/signin" });
  }
};

export default routeAuthGuard;
