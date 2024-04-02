import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { LeagueDataType } from "@interfaces/Common/leagueType";

interface HomeLeagueItemProps {
  league: LeagueDataType;
  isActive: boolean;
  onSelectLeague: Dispatch<SetStateAction<LeagueDataType>>;
}

const HomeLeagueItem = ({ league, isActive, onSelectLeague }: HomeLeagueItemProps) => {
  const handleSelectLeague = useCallback(() => {
    onSelectLeague(league);
  }, [onSelectLeague, league]);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelectLeague}
      className={twMerge(
        "flex group relative px-4 group hover:bg-gray-100 py-2 w-full justify-start h-full items-center gap-x-4 before:absolute before:left-0 before:top-1/2 before:h-9 before:w-1 before:-translate-y-1/2 before:rounded-sm before:from-blue-500 before:to-purple-500 before:bg-gradient-to-b  from-blue-500 to-purple-500 before:hidden hover:before:block",
        isActive && "before:block",
      )}
    >
      <img className="w-6 h-6 object-scale-down" alt={league.name} src={league.logo} />
      <span className="text-sm font-semibold group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        {league.name}
      </span>
    </div>
  );
};
export default memo(HomeLeagueItem);
