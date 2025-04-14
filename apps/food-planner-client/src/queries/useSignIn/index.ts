import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

import apiClient from "@/api-client";

function useSignIn() {
  const navigate = useNavigate();

  const mutation = apiClient.auth.signin.useMutation({
    onError: () => {
      toast.error("Invalid credentials!");
    },
    onSuccess: () => {
      toast.success("Logged in successfully!");
      navigate({ to: "/app" });
    },
  });

  return mutation;
}

export default useSignIn;
