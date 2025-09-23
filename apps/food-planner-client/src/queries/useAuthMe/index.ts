import { authClient } from "@/lib/auth";

function useAuthMe() {
  const { useSession } = authClient;
  const { data, error, isPending } = useSession();

  return {
    data,
    error,
    isLoading: isPending,
  };
}

export default useAuthMe;
