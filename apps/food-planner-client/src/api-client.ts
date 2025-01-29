import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "@jcmono/api-contract";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

export default apiClient;
