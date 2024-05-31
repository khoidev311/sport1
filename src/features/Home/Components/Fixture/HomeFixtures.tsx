import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

import { FixtureDataType } from "@interfaces/Common/fixrureType";
import { getFixtureByLeagueId } from "@services/App/fixtureService";
import { LeagueDataType } from "@interfaces/Common/leagueType";
import { TableContentBodyEmptyItem } from "@components/Table";
import useToast from "@hooks/useToast";

import HomeFixtureHeader from "./HomeFixtureHeader";
import HomeFixtureItem from "./HomeFixtureItem";
import HomeFixtureItemSkeleton from "./HomeFixtureItemSkeleton";

interface HomeFixturesProps {
  league: LeagueDataType;
}

const HomeFixtures = ({ league }: HomeFixturesProps) => {
  const { t } = useTranslation();
  const [fixtures, setFixtures] = useState<FixtureDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const fetchData = useCallback(async () => {
    if (isEmpty(league)) {
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await getFixtureByLeagueId(league._id);
      setFixtures(data);
    } catch {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [league, toast, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="w-full rounded-lg h-auto border bg-white">
      <HomeFixtureHeader league={league} />
      <div className="w-full h-fit">
        {isLoading &&
          Array.from({ length: 10 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeFixtureItemSkeleton key={index} />
          ))}
        {!isLoading && fixtures?.map((item) => <HomeFixtureItem key={item._id} fixture={item} />)}
        {!isLoading && fixtures.length < 1 && <TableContentBodyEmptyItem className="w-full h-96" />}
      </div>
    </div>
  );
};
export default memo(HomeFixtures);
