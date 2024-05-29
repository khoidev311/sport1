import { memo, useCallback, useEffect, useState } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";
import { RankDataType } from "@interfaces/Common/rankType";
import { TableContentBodyEmptyItem } from "@components/Table";
import { getRankByLeagueId } from "@services/App/rankService";

import HomeRankingItem from "./HomeRankingItem";
import HomeRankingHeader from "./HomeRankingHeader";
import HomeRankingItemSkeleton from "./HomeRankingItemSkeleton";

interface HomeRankingProps {
  league: LeagueDataType;
}

const HomeRanking = ({ league }: HomeRankingProps) => {
  const [ranking, setRanking] = useState<RankDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!league) return;
    setIsLoading(true);
    try {
      const { data } = await getRankByLeagueId(league._id);
      setRanking(data);
    } finally {
      setIsLoading(false);
    }
  }, [league]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="xs:overflow-x-scroll md:overscroll-x-none">
      <div className="h-fit xs:w-max md:w-full bg-white rounded-md border pb-1 ">
        <HomeRankingHeader />
        <div className="w-full h-fit px-2">
          {!isLoading && ranking.map((item) => <HomeRankingItem key={item._id} rank={item} />)}
          {isLoading &&
            Array.from({ length: 10 }).map((_1, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <HomeRankingItemSkeleton key={index} />
            ))}
          {!isLoading && ranking.length < 1 && <TableContentBodyEmptyItem className="w-full h-96" />}
        </div>
      </div>
    </div>
  );
};
export default memo(HomeRanking);
