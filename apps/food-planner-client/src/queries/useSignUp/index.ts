import toast from "react-hot-toast";

import apiClient from "@/api-client";
import { useNavigate } from "@tanstack/react-router";

const useSignUp = () => {
  const navigate = useNavigate();

  const mutation = apiClient.auth.signup.useMutation({
    onError: () => {
      toast.error("There was an error while signing you up! Try again later.");
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate({ to: "/app" });
    },
  });

  return mutation;
};

export default useSignUp;
