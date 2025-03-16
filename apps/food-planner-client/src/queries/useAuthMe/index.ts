import { AUTH_ME_QUERY_KEY } from "./const";

import apiClient from "@/api-client";


const useAuthMe = () => {
  const query = apiClient.auth.me.useQuery(AUTH_ME_QUERY_KEY);

  return query;
};

export default useAuthMe;
