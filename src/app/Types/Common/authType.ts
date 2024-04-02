import { UserDataType } from "./userType";

export interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginFormDataType {
  email: string;
  password: string;
}

export interface AuthRegisterFormDataType extends Pick<UserDataType, "email" | "phone"> {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  isAcceptedTerms: boolean;
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
