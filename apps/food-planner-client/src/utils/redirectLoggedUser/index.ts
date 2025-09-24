import { redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth";

async function redirectLoggedUser() {
  const { data } = await authClient.getSession();

  if (data?.user) {
    throw redirect({ to: "/app" });
  }
}

export default redirectLoggedUser;
