import { AUTH_API_PATH } from "@constants/index";
import {
  AuthLoginFormDataType,
  AuthRegisterFormDataType,
  AuthResetPasswordFormDataType,
  AuthTokenType,
  UserDataType,
} from "@interfaces/Common";
import { Axios, axiosInstance } from "@utils/index";

const register = async (data: AuthRegisterFormDataType) => {
  const response = await axiosInstance.post(AUTH_API_PATH.REGISTER, data);
  return response.data;
};

const getMe = async (isRedirectWhenError?: boolean): Promise<UserDataType> => {
  const response = await axiosInstance.get(AUTH_API_PATH.ME, {
    redirectWhenError: isRedirectWhenError,
  });

  return response.data;
};

const loginWithEmailAndPassword = async (data: AuthLoginFormDataType) => {
  const response = await axiosInstance.post(AUTH_API_PATH.LOGIN, data);
  return response.data;
};

const forgetPassword = async (email: string) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(email), 1000);
  });

const resetPassword = async (email: string, data: AuthResetPasswordFormDataType) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          email,
          ...data,
        }),
      1000,
    );
  });

const logOut = async () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({}), 1000);
  });

const getAuthToken = (): AuthTokenType | null => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return null;
  }

  return JSON.parse(authToken);
};

const setAuthToken = (authToken: AuthTokenType) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

const getAccessToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  return authToken.access_token;
};

const getRefreshToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  return authToken.refresh_token;
};

const refreshAccessToken = async (refreshToken: string) => {
  const response = await Axios.instance.post(
    AUTH_API_PATH.REFRESH_TOKEN,
    {
      refreshToken,
    },
    {
      autoRefreshToken: false,
    },
  );

  return response.data.data;
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

export {
  forgetPassword,
  getAccessToken,
  getAuthToken,
  getMe,
  getRefreshToken,
  logOut,
  loginWithEmailAndPassword,
  refreshAccessToken,
  register,
  removeAuthToken,
  resetPassword,
  setAccessToken,
  setAuthToken,
};
