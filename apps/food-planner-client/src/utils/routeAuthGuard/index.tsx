import { authClient } from "@/lib/auth";

async function routeAuthGuard() {
  try {
    const { data } = await authClient.getSession();
    if (!data?.user) {
      return { user: null, error: null };
    }
    return { user: data.user, error: null };
  }
  catch {
    return { user: null, error: "network" };
  }
}

export default routeAuthGuard;
