import { TFunction } from "i18next";
import { object, ref, string } from "yup";

const resetPasswordFormSchema = (t: TFunction) =>
  object().shape({
    password: string().required(t("passwordRequired") ?? ""),
    passwordConfirmation: string()
      .required(t("passwordConfirmationRequired") ?? "")
      .oneOf([ref("password")], t("passwordConfirmationNotMatch") ?? ""),
    otp: string().required(t("otpRequired") ?? ""),
  });

export { resetPasswordFormSchema };
