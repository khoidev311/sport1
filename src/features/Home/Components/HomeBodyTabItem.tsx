import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction, memo, useCallback } from "react";

import { TabFeatureEnum } from "@enums/commonEnum";

interface HomeBodyTabItemProps {
  label: string;
  activeTab: TabFeatureEnum;
  tab: TabFeatureEnum;
  setActiveTab: Dispatch<SetStateAction<TabFeatureEnum>>;
}

const HomeBodyTabItem = ({ label, activeTab, tab, setActiveTab }: HomeBodyTabItemProps) => {
  const handleActiveTab = useCallback(() => {
    setActiveTab(tab);
  }, [tab, setActiveTab]);
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleActiveTab}
      className={twMerge(
        "w-fit relative group h-full flex font-semibold group-hover:text-transparent px-4 items-center justify-center before:absolute before:left-0 before:bottom-0 before:h-1 before:w-full before:rounded-sm before:from-blue-500 before:to-purple-500 before:bg-gradient-to-b  from-blue-500 to-purple-500 before:hidden hover:before:block",
        activeTab === tab &&
          "before:block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500",
      )}
    >
      {label}
    </div>
  );
};
export default memo(HomeBodyTabItem);
