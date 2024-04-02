import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

import { AUTH_PATH } from "@constants/routeConstant";

const RegisterFormFooter = () => {
  const { t } = useTranslation("company");

  const [searchParams] = useSearchParams();

  return (
    <>
      {t("alreadyHaveAccount")}
      <Link
        to={`${AUTH_PATH.LOGIN}?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
        className="ml-1 block font-semibold underline hover:text-primary-700 sm:inline-block"
      >
        {t("loginNow")}
      </Link>
    </>
  );
};

export default memo(RegisterFormFooter);
