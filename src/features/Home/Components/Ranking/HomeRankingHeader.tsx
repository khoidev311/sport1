import { memo } from "react";
import { useTranslation } from "react-i18next";

const HomeRankingHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-200 w-full rounded-t-md mb-1">
      <div className="w-full h-12 grid grid-cols-7 px-2">
        <div className="col-span-2  flex items-center justify-start">
          <div className="w-8 h-8 leading-8 rounded-md text-center font-bold">#</div>
          <div className="flex-auto h-8 font-bold px-2 rounded-md text-sm leading-8">{t("club")}</div>
        </div>
        <div className="col-span-3  flex justify-center items-center text-sm">
          <div className="w-8 h-8 leading-8 text-center">M</div>
          <div className="w-8 h-8 leading-8 text-center">W</div>
          <div className="w-8 h-8 leading-8 text-center">D</div>
          <div className="w-8 h-8 leading-8 text-center">L</div>
          <div className="w-8 h-8 leading-8 text-center">G</div>
          <div className="w-8 h-8 leading-8 text-center">E</div>
          <div className="w-8 h-8 leading-8 text-center font-bold">P</div>
        </div>
        <div className="col-span-2  flex items-center justify-center leading-8 text-sm font-bold">
          {t("form")}
        </div>
      </div>
    </div>
  );
};
export default memo(HomeRankingHeader);
