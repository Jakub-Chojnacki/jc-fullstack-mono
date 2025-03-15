import { redirect } from "@tanstack/react-router";

import apiClient from "@/api-client";
import { queryClient } from "@/main";

const redirectLoggedUser = async () => {
  try {
    const user = await apiClient.auth.me.ensureQueryData(queryClient, ["me"]);

    if (user) {
      return redirect({ to: "/app" });
    }
  } catch (err) {
    return null;
  }
};

export default redirectLoggedUser;
