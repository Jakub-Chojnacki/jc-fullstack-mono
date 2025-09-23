import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
