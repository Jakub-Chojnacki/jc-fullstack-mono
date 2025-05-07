import apiClient from "@/api-client";
import { router } from "@/main";

async function redirectLoggedUser() {
  const user = await apiClient.auth.me.query();

  if (user.status === 200) {
    router.navigate({ to: "/app" });
  }
}

export default redirectLoggedUser;
