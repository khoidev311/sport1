import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Alert } from "@components/Alert";
import { Button } from "@components/Button";
import { Input } from "@components/Form";
import { AUTH_CODE } from "@constants/codeConstant";
import { AUTH_PATH } from "@constants/routeConstant";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { AuthFormGeneralError, AuthLoginFormDataType } from "@interfaces/Common";
import { authService } from "@services/index";
import { setAuthToken } from "@services/Common/authService";

import AuthFormContainer from "../Components/AuthFormContainer";
import { loginFormSchema } from "../Schemas/LoginFormSchema";
import LoginFormFooter from "./Components/LoginFormFooter";

const Login = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<AuthFormGeneralError | null>(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit: useFormSubmit,
    watch,
    ...methods
  } = useForm<AuthLoginFormDataType>({
    resolver: yupResolver(loginFormSchema(t)),
  });

  const username = watch("username");

  const handleSubmit = useFormSubmit((formData) => {
    setIsSubmitting(true);

    authService
      .loginWithEmailAndPassword(formData)
      .then((data) => {
        const { access_token: accessToken, refresh_token: refreshToken } = data;

        setAuthToken({ access_token: accessToken, refresh_token: refreshToken });

        navigate("/");
      })
      .catch((err) => {
        setGeneralError({ ...err });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  });

  useDocumentTitle(t("login"));

  return (
    <AuthFormContainer title={t("loginTitle")} subtitle={t("loginSubtitle")} footer={<LoginFormFooter />}>
      <FormProvider control={control} handleSubmit={useFormSubmit} watch={watch} {...methods}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {generalError && (
            <Alert title={t("loginError")} message={generalError.message} type="danger" className="mb-2">
              {generalError.code === AUTH_CODE.ACCOUNT_NOT_EXISTS && (
                <Link
                  to={`${AUTH_PATH.REGISTER}?username=${encodeURIComponent(
                    username || "",
                  )}&redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
                >
                  {t("createWithEmail")}
                </Link>
              )}
            </Alert>
          )}
          <Input
            name="username"
            label={t("username")}
            className="block"
            control={control}
            disabled={isSubmitting}
          />
          <Input
            type="password"
            label={t("password")}
            name="password"
            className="block"
            control={control}
            disabled={isSubmitting}
          />
          <div className="-mb-1.5 -mt-2 flex justify-end">
            <Link
              to={AUTH_PATH.FORGET_PASSWORD}
              className="text-center text-sm font-semibold text-gray-400 hover:underline"
              role="link"
              tabIndex={-1}
            >
              {t("forgetYourPassword")}
            </Link>
          </div>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {t("login")}
          </Button>
        </form>
      </FormProvider>
    </AuthFormContainer>
  );
};

export default memo(Login);
