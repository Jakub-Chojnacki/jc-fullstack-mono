import { contract } from "@jcmono/api-contract";
import { initQueryClient } from "@ts-rest/react-query";
import type { Method } from "axios";
import { isAxiosError } from "axios";

import { axiosClient } from "./axios-client";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  // https://ts-rest.com/client/fetch#using-alternative-http-clients
  api: async ({ path, method, headers, body }) => {
    try {
      const result = await axiosClient.request({
        method: method as Method,
        url: path,
        headers,
        data: body,
      });
      return {
        status: result.status,
        body: result.data,
        headers: new Headers(result.headers as Record<string, string>),
      };
    }
    catch (error) {
      if (isAxiosError(error) && error.response) {
        return {
          status: error.response.status,
          body: error.response.data,
          headers: new Headers(
            error.response.headers as Record<string, string>,
          ),
        };
      }
      throw error;
    }
  },
});

export default apiClient;
