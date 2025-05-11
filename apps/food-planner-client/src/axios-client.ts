import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { router } from "./main";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

function processQueue(error: any, response: any = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error)
      reject(error);
    else resolve(response);
  });
  failedQueue = [];
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.code === "ERR_NETWORK") {
      /* This is mostly for CORS errors.
      A CORS error doesn't return a 401 and it can cause an infinite loop which will crash the browser
      */
      return new Promise(() => {
        (originalRequest as any)._noRetry = true;
      });
    }

    const isAuthError
      = error.response?.status === 401 && originalRequest.url?.includes("/api/auth");

    if (
      error.response?.status === 401
      && !originalRequest._retry
      && !isAuthError
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosClient.post(`/api/auth/refresh`);
          processQueue(null);
        }
        catch (err) {
          processQueue(err, null);
          // Redirect to signin when refresh token is expired
          router.navigate({ to: "/signin" });
          return Promise.reject(err);
        }
        finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(axiosClient(originalRequest)),
          reject,
        });
      });
    }

    return Promise.reject(error);
  },
);
