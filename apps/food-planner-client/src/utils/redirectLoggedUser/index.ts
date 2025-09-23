import { authClient } from "@/lib/auth";
import { router } from "@/main";

async function redirectLoggedUser() {
  const { data } = await authClient.getSession();

  if (data?.user) {
    router.navigate({ to: "/app" });
  }
}

export default redirectLoggedUser;
