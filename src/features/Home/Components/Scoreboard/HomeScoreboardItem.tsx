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
      <div className="xs:col-span-3 md:col-span-2 grid grid-cols-8 h-fit ">
        <div className="col-span-3 flex justify-end">
          <TeamLogoAndName
            teamNameClassName="font-semibold xs:text-xs md:text-base text-end text-ellipsis xs:line-clamp-2 md:line-clamp-1 xs:h-fit md:h-6 break-words"
            type={TeamLogoAndNameEnum.NAME_TO_LOGO}
            team={score.host_team}
            containerClassName="w-fit"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <span className="bg-gray-600 font-bold xs:text-md md:text-xl text-white py-1 px-2 rounded-md">
            {score.score}
          </span>
        </div>
        <div className="col-span-3 flex justify-start ">
          <TeamLogoAndName
            teamNameClassName="font-semibold xs:text-xs md:text-base text-start text-ellipsis xs:line-clamp-2 md:line-clamp-1 xs:h-fit md:h-6 break-words"
            type={TeamLogoAndNameEnum.LOGO_TO_NAME}
            team={score.guest_team}
            containerClassName="w-fit"
          />
        </div>
      </div>
      <div className="col-span-1 xs:hidden md:flex justify-end">
        <div className="w-fit h-full flex items-center hover:translate-x-1 transition-all">
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};
export default memo(HomeScoreboardItem);
