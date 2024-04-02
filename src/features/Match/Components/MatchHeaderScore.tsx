import TeamLogoAndName from "src/features/AppComponents/TeamLogoAndName";
import { memo } from "react";

import { TeamLogoAndNameEnum } from "@enums/commonEnum";
import { ScoreDataType } from "@interfaces/Common/scoreType";

import MatchHeaderScoreSkeleton from "./MatchHeaderScoreSkeleton";

interface MatchHeaderScoreProps {
  score: ScoreDataType | null;
  isLoading: boolean;
}

const MatchHeaderScore = ({ score, isLoading }: MatchHeaderScoreProps) => {
  return (
    <div className="w-full  bg-white rounded-b-lg h-40 grid grid-cols-8">
      {isLoading ? (
        <MatchHeaderScoreSkeleton />
      ) : (
        <>
          <div className="col-span-3 flex items-center justify-center">
            <TeamLogoAndName
              type={TeamLogoAndNameEnum.LOGO_INTO_NAME}
              team={score?.host_team}
              logoClassName="w-12 h-12"
            />
          </div>
          <div className="col-span-2  flex items-center justify-center">
            <div className="text-4xl font-semibold rounded-md">{score?.score}</div>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <TeamLogoAndName
              type={TeamLogoAndNameEnum.LOGO_INTO_NAME}
              team={score?.guest_team}
              logoClassName="w-12 h-12"
            />
          </div>
        </>
      )}
    </div>
  );
};
export default memo(MatchHeaderScore);
