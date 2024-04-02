import { AUTH_API_PATH } from "@constants/index";
import { DataStatusEnum } from "@enums/commonEnum";
import { UserRoleEnum } from "@enums/userEnum";
import {
  AuthLoginFormDataType,
  AuthRegisterFormDataType,
  AuthResetPasswordFormDataType,
  AuthTokenType,
  UserDataType,
} from "@interfaces/Common";
import { Axios } from "@utils/index";

const fakeUserData: UserDataType = {
  id: 0,
  email: "garetbale@gmail.com",
  phone: "0123456780",
  fullName: "Garet Bale",
  avatar:
    "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTulTE7UvebqStVIkYIQYE0PcoHMKYN5soWvGCaGI3Ixy1rmwLUIbmPSEUVkGnA27x0",
  role: {
    id: 1,
    name: UserRoleEnum.USER,
    slug: UserRoleEnum.USER,
  },
  status: DataStatusEnum.ACTIVATED,
};

const getMe = async (isRedirectWhenError?: boolean): Promise<UserDataType> => {
  // eslint-disable-next-line no-console
  console.log("getMe", isRedirectWhenError);

  // const response = await Axios.instance.get(AUTH_API_PATH.ME, {
  //   params: {
  //     expand: ["role", "city", "country"],
  //   },
  //   redirectWhenError: isRedirectWhenError,
  // });

  // return response.data.data;

  return Promise.resolve(fakeUserData);
};

const loginWithEmailAndPassword = async (data: AuthLoginFormDataType) =>
  new Promise<UserDataType>((resolve) => {
    setTimeout(() => {
      resolve({ ...fakeUserData, email: data.email });
    }, 1000);
  });

const register = async (data: AuthRegisterFormDataType) =>
  new Promise<UserDataType>((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...data,
          id: 1,
          fullName: data.firstName.concat(" ", data.lastName),
          role: {
            id: 2,
            name: UserRoleEnum.USER,
            slug: UserRoleEnum.USER,
          },
          status: DataStatusEnum.ACTIVATED,
        }),
      1000,
    );
  });

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

  return authToken.accessToken;
};

const getRefreshToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  return authToken.refreshToken;
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
