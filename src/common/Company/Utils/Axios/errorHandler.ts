import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { UNAUTHORIZED } from "http-status";
import _ from "lodash";

import { authService } from "@services/index";

import { AUTH_PATH } from "../../../../app/Constants";

const errorHandler = async (
  error: { response: AxiosResponse; config: AxiosRequestConfig },
  instance: AxiosInstance,
) => {
  const { response, config = {} } = error;
  const { redirectWhenError, autoRefreshToken } = config;

  let redirectURL = "";

  if (_.keys(response).length !== 0) {
    const { status } = response;

    if (status === UNAUTHORIZED && autoRefreshToken !== false) {
      try {
        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          throw new Error("REFRESH_TOKEN_NOT_FOUND");
        }

        const { token: newAccessToken } = await authService.refreshAccessToken(refreshToken);

        authService.setAccessToken(newAccessToken);

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        config.autoRefreshToken = false;

        return await instance(config);
      } catch (refreshError) {
        authService.removeAuthToken();
        redirectURL = AUTH_PATH.LOGIN;
      }
    } else if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTH_PATH.LOGIN;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL !== "" && redirectWhenError !== false) {
    const currentURL = window.location.pathname;
    if (!redirectURL.includes(currentURL)) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
