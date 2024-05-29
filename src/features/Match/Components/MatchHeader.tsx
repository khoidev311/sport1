import { memo } from "react";

import { ScoreDataType } from "@interfaces/Common/scoreType";
import { LoadingSkeleton } from "@components/Loading";

import MatchHeaderScore from "./MatchHeaderScore";

interface MatchHeaderProps {
  score: ScoreDataType | null;
  isLoading: boolean;
}

const MatchHeader = ({ score, isLoading }: MatchHeaderProps) => {
  return (
    <div className="xs:w-full md:w-150 h-fit border xs:rounded-none md:rounded-lg">
      <div className="w-full h-14 text-xl flex items-center px-4 bg-app font-semibold xs:rounded-t-none md:rounded-t-lg text-white">
        {isLoading ? (
          <LoadingSkeleton className="w-52 h-6 rounded-full" />
        ) : (
          `${score?.host_team?.name || "_"} - ${score?.guest_team?.name || "_"}`
        )}
      </div>
      <MatchHeaderScore score={score} isLoading={isLoading} />
    </div>
  );
};
export default memo(MatchHeader);
