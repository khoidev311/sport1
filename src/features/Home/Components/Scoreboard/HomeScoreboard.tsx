import { memo, useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";

import { ScoreDataType } from "@interfaces/Common/scoreType";
import { getScoreByLeagueId } from "@services/App/scoreService";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { TableContentBodyEmptyItem } from "@components/Table";

import HomeScoreboardItem from "./HomeScoreboardItem";
import HomeScoreboardHeader from "./HomeScoreboardHeader";
import HomeScoreboardItemSkeleton from "./HomeScoreboardItemSkeleton";

interface HomeScoreboardProps {
  league: LeagueDataType;
}

const HomeScoreboard = ({ league }: HomeScoreboardProps) => {
  const [scores, setScores] = useState<ScoreDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (isEmpty(league)) return;
    setIsLoading(true);
    try {
      const { data } = await getScoreByLeagueId(league._id);
      setScores(data);
    } finally {
      setIsLoading(false);
    }
  }, [league]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="h-fit w-full bg-white rounded-md border">
      <HomeScoreboardHeader league={league} />
      <div className="w-full h-fit px-4 ">
        {!isLoading && scores.map((item) => <HomeScoreboardItem key={item._id} score={item} />)}
        {isLoading &&
          Array.from({ length: 10 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeScoreboardItemSkeleton key={index} />
          ))}
        {!isLoading && scores.length < 1 && <TableContentBodyEmptyItem className="w-full h-96" />}
      </div>
    </div>
  );
};
export default memo(HomeScoreboard);
