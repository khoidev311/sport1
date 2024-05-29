import { Dispatch, SetStateAction, memo } from "react";

import { TabFeatureEnum } from "@enums/commonEnum";

import HomeBodyTab from "./HomeBodyTab";

interface HomeBodyHeaderProps {
  activeTab: TabFeatureEnum;
  setActiveTab: Dispatch<SetStateAction<TabFeatureEnum>>;
}
const HomeBodyHeader = ({ activeTab, setActiveTab }: HomeBodyHeaderProps) => {
  return (
    <div className="w-full bg-white h-12 mb-6 rounded-md border px-4 flex items-center">
      <HomeBodyTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
export default memo(HomeBodyHeader);
