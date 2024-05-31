import axios from "axios";
import { set } from "lodash";

import { authService } from "@services/index";

import { normalizeQuery } from "../Helpers/requestHelper";
import errorHandler from "./errorHandler";

declare module "axios" {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://nodejs-be-sport1.onrender.com",
  timeout: 30000,
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-US",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (request) => {
    set(request, "headers.Authorization", `Bearer ${authService.getAccessToken()}`);

    const { params, url } = request;

    if (!params || !url) {
      return request;
    }

    request.params = normalizeQuery(params);

    return request;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
