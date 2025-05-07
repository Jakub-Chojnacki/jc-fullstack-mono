
import apiClient from "@/api-client";

async function routeAuthGuard() {
  try {
    const user = await apiClient.auth.me.query();
    return user;
  }
  catch {
    throw new Error("Unauthorized");
  }
}

export default routeAuthGuard;
