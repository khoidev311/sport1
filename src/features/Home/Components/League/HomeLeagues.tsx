import { Dispatch, SetStateAction, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LeagueDataType } from "@interfaces/Common/leagueType";
import { getLeagues } from "@services/App/leagueService";

import HomeLeagueItem from "./HomeLeagueItem";
import HomeLeagueItemSkeleton from "./HomeLeagueItemSkeleton";

interface HomeLeaguesProps {
  league: LeagueDataType;
  onSelectLeague: Dispatch<SetStateAction<LeagueDataType>>;
}

const HomeLeagues = ({ league, onSelectLeague }: HomeLeaguesProps) => {
  const { t } = useTranslation();
  const [leagues, setLeagues] = useState<LeagueDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getLeagues();
      setLeagues(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="col-span-1 bg-white rounded-lg h-fit border last:rounded-b-md">
      <div className="w-full border-b h-12 px-3 flex items-center py-2 font-semibold">
        {t("footballLeagues")}
      </div>
      <div className="w-full h-fit py-2">
        {isLoading &&
          Array.from({ length: 9 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeLeagueItemSkeleton key={index} />
          ))}
        {!isLoading &&
          leagues.map((item) => (
            <HomeLeagueItem
              isActive={league.uuid === item.uuid}
              key={item.uuid}
              league={item}
              onSelectLeague={onSelectLeague}
            />
          ))}
      </div>
    </div>
  );
};
export default memo(HomeLeagues);
