import { Dispatch, SetStateAction, memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { first } from "lodash";

import { LeagueDataType } from "@interfaces/Common/leagueType";
import { getLeagues } from "@services/App/leagueService";
import { TableContentBodyEmptyItem } from "@components/Table";
import { OptionLegacy, SelectLegacy } from "@components/Form";
import { SelectPositionEnum } from "@enums/commonEnum";
import { LoadingSkeleton } from "@components/Loading";
import useToast from "@hooks/useToast";

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
  const toast = useToast();
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getLeagues();
      setLeagues(data);
      if (data) {
        onSelectLeague(first(data) || ({} as LeagueDataType));
      }
    } catch {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [onSelectLeague, toast, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="xs:col-span-4 lg:col-span-1 bg-white md:block  xs:flex xs:justify-between rounded-lg h-fit border last:rounded-b-md">
      <div className="w-full border-b h-12 px-3 md:text-base xs:text-sm flex items-center py-2 font-semibold">
        {t("footballLeagues")}
      </div>
      <div className="md:hidden xs:flex items-center h-12 w-1/2">
        {!isLoading && leagues?.length > 0 ? (
          <SelectLegacy
            className="h-12 w-full mr-3 justify-end"
            defaultValue={String(league?._id)}
            position={SelectPositionEnum.BOTTOM_RIGHT}
            onChange={(value) => onSelectLeague(leagues.find((item) => item._id === value) as LeagueDataType)}
          >
            {leagues.map((item) => (
              <OptionLegacy key={item._id} value={String(item._id)} className="flex w-fit ">
                <div className="w-max text-sm">{item.name}</div>
              </OptionLegacy>
            ))}
          </SelectLegacy>
        ) : (
          <LoadingSkeleton className="w-20 h-6s rounded-lg" />
        )}
      </div>
      <div className="w-full xs:hidden md:flex h-fit py-2 flex-wrap">
        {isLoading &&
          leagues?.length === 0 &&
          Array.from({ length: 9 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HomeLeagueItemSkeleton key={index} />
          ))}
        {!isLoading &&
          leagues?.length !== 0 &&
          leagues?.map((item) => (
            <HomeLeagueItem
              isActive={String(league._id) === String(item._id)}
              key={item._id}
              league={item}
              onSelectLeague={onSelectLeague}
            />
          ))}
        {!isLoading && leagues?.length < 1 && <TableContentBodyEmptyItem className="w-full h-96" />}
      </div>
    </div>
  );
};
export default memo(HomeLeagues);
