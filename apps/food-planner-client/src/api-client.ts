import { contract } from "@jcmono/api-contract";
import { initQueryClient } from "@ts-rest/react-query";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

export default apiClient;
