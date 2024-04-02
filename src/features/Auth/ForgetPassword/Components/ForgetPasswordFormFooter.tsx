import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AUTH_PATH } from "@constants/routeConstant";

const ForgetPasswordFormFooter = () => {
  const { t } = useTranslation("company");

  return (
    <div className="text-left">
      <Link
        to={AUTH_PATH.LOGIN}
        className="flex items-center justify-start font-semibold text-gray-500 hover:text-primary-700 hover:underline sm:inline-block"
      >
        <FiChevronLeft className="mb-1 mr-2 inline-block" />
        <span>{t("login")}</span>
      </Link>
    </div>
  );
};

export default memo(ForgetPasswordFormFooter);
