import { memo } from "react";
import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

import BigNews from "./Big/BigNews";
import LastestNews from "./Lastest/LastestNews";
import HotNews from "./Hot/HotNews";
import TransferNews from "./Transfer/TransferNews";

const News = () => {
  const { t } = useTranslation();
  useDocumentTitle(t("news"));
  return (
    <div className="w-full h-fit xs:px-6 md:px-20 xl:px-40 bg-gray-50 py-8">
      <div className="w-full h-full grid grid-cols-3 gap-x-6 mb-6">
        <BigNews />
        <LastestNews />
      </div>
      <HotNews />
      <TransferNews />
    </div>
  );
};
export default memo(News);
