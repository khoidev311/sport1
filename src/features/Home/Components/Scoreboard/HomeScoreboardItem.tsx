import { memo } from "react";
import TeamLogoAndName from "src/features/AppComponents/TeamLogoAndName";
import { FaArrowRight } from "react-icons/fa";

import { ScoreDataType } from "@interfaces/Common/scoreType";
import { TeamLogoAndNameEnum } from "@enums/commonEnum";

interface HomeScoreboardItemProps {
  score: ScoreDataType;
}
const HomeScoreboardItem = ({ score }: HomeScoreboardItemProps) => {
  return (
    <div className="w-full grid grid-cols-3 py-4 border-b">
      <div className="col-span-2 grid grid-cols-8 h-fit ">
        <div className="col-span-3 flex justify-end">
          <TeamLogoAndName
            teamNameClassName="font-semibold text-md"
            type={TeamLogoAndNameEnum.NAME_TO_LOGO}
            team={score.host_team}
            containerClassName="w-fit"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <span className="bg-gray-600 font-bold text-xl text-white py-1 px-2 rounded-md">{score.score}</span>
        </div>
        <div className="col-span-3 flex justify-start">
          <TeamLogoAndName
            teamNameClassName="font-semibold text-md"
            type={TeamLogoAndNameEnum.LOGO_TO_NAME}
            team={score.guest_team}
            containerClassName="w-fit"
          />
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <div className="w-fit h-full flex items-center hover:translate-x-1 transition-all">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};
export default memo(HomeScoreboardItem);
