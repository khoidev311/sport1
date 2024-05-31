import { UserDataType } from "./userType";

export interface AuthTokenType {
  access_token: string;
  refresh_token: string;
}

export interface AuthLoginFormDataType {
  username: string;
  password: string;
}

export interface AuthRegisterFormDataType extends Pick<UserDataType, "email"> {
  username: string;
  fullname: string;
  password: string;
}

export interface AuthForgetPasswordFormDataType {
  email: string;
}

export interface AuthResetPasswordFormDataType {
  password: string;
  passwordConfirmation: string;
  otp: string;
}

export interface AuthFormGeneralError {
  code: string;
  message: string;
}
