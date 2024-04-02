import { memo } from "react";
import { twMerge } from "tailwind-merge";
import TeamLogoAndName from "src/features/AppComponents/TeamLogoAndName";

import { RankDataType } from "@interfaces/Common/rankType";
import { FinishMatchEnum, TeamLogoAndNameEnum } from "@enums/commonEnum";

interface HomeRankingItemProps {
  rank: RankDataType;
}

const HomeRankingItem = ({ rank }: HomeRankingItemProps) => {
  return (
    <div className="w-full h-10 grid grid-cols-7 rounded-t-md">
      <div className="col-span-2 flex items-center justify-start">
        <div
          className={twMerge(
            "w-8 h-8 text-sm leading-8 bg-slate-200 rounded-md text-center font-semibold",
            rank.rank <= 4 && "bg-blue-500 text-white",
            rank.rank >= 18 && "bg-red-700 text-white",
            rank.rank === 5 && "bg-green-500 text-white",
            rank.rank === 6 && "bg-yellow-500 text-white",
          )}
        >{`${rank.rank}.`}</div>
        <div className="flex-auto h-8  rounded-md text-sm leading-8 px-2">
          <TeamLogoAndName type={TeamLogoAndNameEnum.LOGO_TO_NAME} logoClassName="w-6 h-6" team={rank.team} />
        </div>
      </div>
      <div className="col-span-3  flex items-center justify-center leading-8 text-sm">
        <div className="w-8 h-8  rounded-md text-center">{rank.total_match}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.win}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.lost}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.draw}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.goal}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.efficiency}</div>
        <div className="w-8 h-8  rounded-md text-center">{rank.point}</div>
      </div>
      <div className="col-span-2 flex items-center justify-center gap-x-2">
        {rank?.history_match?.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={twMerge(
              "w-8 h-8  border text-sm leading-8 text-white font-bold rounded-full text-center",
              item === FinishMatchEnum.WIN && "bg-green-500",
              item === FinishMatchEnum.LOST && "bg-red-700",
              item === FinishMatchEnum.DRAW && "bg-yellow-500",
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(HomeRankingItem);
