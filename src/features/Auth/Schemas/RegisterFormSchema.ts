import { TFunction } from "i18next";
import { string } from "yup";

import { AuthRegisterFormDataType } from "@interfaces/Common";
import { generateFormSchema } from "@utils/Helpers/commonHelper";

const registerFormSchema = (t: TFunction) =>
  generateFormSchema<AuthRegisterFormDataType>({
    username: string().required(t("usernameRequired") ?? ""),
    fullname: string().required(t("fullnameRequired") ?? ""),
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
  });

export { registerFormSchema };
