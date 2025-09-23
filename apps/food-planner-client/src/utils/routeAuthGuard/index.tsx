import { authClient } from "@/lib/auth";

async function routeAuthGuard() {
  const { data } = await authClient.getSession();

  if (!data?.user) {
    throw new Error("Unauthorized");
  }

  return data?.user;
}

export default routeAuthGuard;
