import { TFunction } from "i18next";
import { boolean, ref, string } from "yup";

import { AuthRegisterFormDataType } from "@interfaces/Common";
import { generateFormSchema } from "@utils/Helpers/commonHelper";

const registerFormSchema = (t: TFunction) =>
  generateFormSchema<AuthRegisterFormDataType>({
    firstName: string().required(t("firstNameRequired") ?? ""),
    lastName: string().required(t("lastNameRequired") ?? ""),
    phone: string().required(t("phoneRequired")),
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
    passwordConfirmation: string()
      .oneOf([ref("password")], t("passwordConfirmationNotMatch") ?? "")
      .required(t("passwordConfirmationRequired") ?? ""),
    isAcceptedTerms: boolean(),
  });

export { registerFormSchema };
