import { memo } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";

interface HomeFixtureHeaderProps {
  league: LeagueDataType;
}
const HomeFixtureHeader = ({ league }: HomeFixtureHeaderProps) => {
  return (
    <div className="w-full h-12 rounded-t-md border-b px-4 flex items-center">
      <span className="w-fit h-full font-semibold flex items-center md:text-base xs:text-sm">{`${
        league?.name || "_"
      } - R 31`}</span>
    </div>
  );
};
export default memo(HomeFixtureHeader);
