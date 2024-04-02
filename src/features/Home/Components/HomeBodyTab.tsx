import { Dispatch, SetStateAction, memo } from "react";
import { useTranslation } from "react-i18next";

import { TabFeatureEnum } from "@enums/commonEnum";

import HomeBodyTabItem from "./HomeBodyTabItem";

interface HomeBodyTabProps {
  activeTab: TabFeatureEnum;
  setActiveTab: Dispatch<SetStateAction<TabFeatureEnum>>;
}

const HomeBodyTab = ({ activeTab, setActiveTab }: HomeBodyTabProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-12 gap-x-4 flex items-center justify-start">
      <HomeBodyTabItem
        label={t("scoreboard")}
        tab={TabFeatureEnum.SCOREBOARD}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HomeBodyTabItem
        label={t("fixtures")}
        tab={TabFeatureEnum.FIXTURES}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HomeBodyTabItem
        label={t("ranking")}
        tab={TabFeatureEnum.RANKING}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
export default memo(HomeBodyTab);
