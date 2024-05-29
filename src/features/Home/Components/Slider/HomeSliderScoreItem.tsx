import { memo } from "react";
import TeamLogoAndName from "src/features/AppComponents/TeamLogoAndName";
import { Link } from "react-router-dom";

import { ScoreDataType } from "@interfaces/Common/scoreType";
import { TeamLogoAndNameEnum } from "@enums/commonEnum";
import { PAGE_PATH } from "@constants/routeConstant";

interface HomeSliderScoreItemProps {
  score: ScoreDataType;
}

const HomeSliderScoreItem = ({ score }: HomeSliderScoreItemProps) => {
  return (
    // eslint-disable-next-line no-underscore-dangle
    <Link to={`${PAGE_PATH.MATCH}?from_match=${score._id}`}>
      <div className="xs:w-full xs:h-32 md:w-56 md:h-28 xl:w-72 xl:h-36 border rounded-lg bg-white hover:bg-gray-100">
        <div className="grid h-full grid-cols-3">
          <div className="col-span-2 h-full">
            <div className="w-full pl-5 h-1/2 pb-3  flex justify-center items-center">
              <TeamLogoAndName
                type={TeamLogoAndNameEnum.LOGO_TO_NAME}
                team={score?.host_team}
                containerClassName="items-end"
              />
            </div>
            <div className="w-full pl-5 h-1/2 pt-3 flex justify-center items-center">
              <TeamLogoAndName
                type={TeamLogoAndNameEnum.LOGO_TO_NAME}
                team={score?.guest_team}
                containerClassName="items-start"
              />
            </div>
          </div>
          <div className="col-span-1 h-full py-8">
            <div className="w-full h-full border-l flex items-center justify-center">
              <div className="w-full text-sm">
                <div className="w-full text-center font-semibold">Finish</div>
                <div className="w-full text-center">{score?.score}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default memo(HomeSliderScoreItem);
