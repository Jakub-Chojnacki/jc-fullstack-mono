import { contract } from "@jcmono/api-contract";
import { initQueryClient } from "@ts-rest/react-query";
import type { AxiosError, AxiosResponse, Method } from "axios";
import { isAxiosError } from "axios";

import { axiosClient } from "./axios-client";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
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
        headers: result.headers,
      };
    }
    catch (e: Error | AxiosError | any) {
      if (isAxiosError(e)) {
        const error = e as AxiosError;
        const response = error.response as AxiosResponse;
        return {
          status: response.status,
          body: response.data,
          headers: response.headers,
        };
      }
      throw e;
    }
  },
});

export default apiClient;
