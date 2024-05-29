import { memo } from "react";
import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

import HomeSliderScore from "./Components/Slider/HomeSliderScore";
import HomeBodyContainer from "./Components/HomeBodyContainer";

const Home = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("home"));

  return (
    <div className="h-fit w-full bg-gray-50">
      <HomeSliderScore />
      <HomeBodyContainer />
    </div>
  );
};

export default memo(Home);
