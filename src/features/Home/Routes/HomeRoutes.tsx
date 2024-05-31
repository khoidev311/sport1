import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { ErrorNotFound } from "@common/Features";

import { HOME_PATH } from "../../../app/Constants";
import HomeBlankPage from "../Components/HomeBlankPage";
import Home from "../Home";

const HomeRoutes = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path={HOME_PATH.HOME} element={<Home />} />
      <Route path={HOME_PATH.SPORT1} element={<Home />} />
      <Route path={HOME_PATH.HIGHLIGHT} element={<HomeBlankPage title={t("hightlight")} />} />
      <Route path={HOME_PATH.CLUB} element={<HomeBlankPage title={t("club")} />} />
      <Route path={HOME_PATH.CONTACT} element={<HomeBlankPage title={t("contact")} />} />
      <Route path={HOME_PATH.NOT_FOUND} element={<ErrorNotFound />} />
    </Routes>
  );
};

export default memo(HomeRoutes);
