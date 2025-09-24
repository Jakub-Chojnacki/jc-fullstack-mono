import { redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth";

async function routeAuthGuard() {
  const { data } = await authClient.getSession();

  if (!data?.user) {
    throw redirect({ to: "/signin" });
  }
}

export default routeAuthGuard;
