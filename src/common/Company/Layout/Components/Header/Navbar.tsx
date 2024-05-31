import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { HOME_PATH } from "@constants/routeConstant";

const LayoutHeaderNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden items-center space-x-6 lg:flex">
      <Link
        className="cursor-pointer duration-75 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        to={HOME_PATH.HOME}
      >
        {t("home")}
      </Link>
      <Link
        className="cursor-pointer duration-75 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        to={HOME_PATH.NEWS}
      >
        {t("news")}
      </Link>
      <Link
        className="cursor-pointer duration-75 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        to={HOME_PATH.HIGHLIGHT}
      >
        {t("highlight")}
      </Link>
      <Link
        className="cursor-pointer duration-75 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        to={HOME_PATH.CLUB}
      >
        {t("club")}
      </Link>
    </div>
  );
};

export default memo(LayoutHeaderNavbar);
