import apiClient from "@/api-client";

import { AUTH_ME_QUERY_KEY } from "./const";



const useAuthMe = () => {
  const query = apiClient.auth.me.useQuery(AUTH_ME_QUERY_KEY);

  return query;
};

export default useAuthMe;
