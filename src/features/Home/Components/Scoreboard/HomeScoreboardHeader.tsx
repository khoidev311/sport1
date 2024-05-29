import { memo } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";

interface HomeScoreboardHeaderProps {
  league: LeagueDataType;
}
const HomeScoreboardHeader = ({ league }: HomeScoreboardHeaderProps) => {
  return (
    <div className="w-full h-12 rounded-t-md border-b px-4 flex items-center">
      <span className="w-fit h-full font-semibold flex items-center">{`${league?.name || "_"} - R 30`}</span>
    </div>
  );
};
export default memo(HomeScoreboardHeader);