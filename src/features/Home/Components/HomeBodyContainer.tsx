import { memo, useState } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";

import HomeLeagues from "./League/HomeLeagues";
import HomeBodyRoute from "./HomeBodyRoute";

const HomeBodyContainer = () => {
  const [selectLeague, setSelectLeague] = useState<LeagueDataType>({} as LeagueDataType);
  return (
    <div className="w-full h-fit  xs:px-6 sm:px-10 md:px-12 xl:px-40 gap-6 grid grid-cols-4 pb-6">
      <HomeLeagues onSelectLeague={setSelectLeague} league={selectLeague} />
      <HomeBodyRoute league={selectLeague} />
    </div>
  );
};
export default memo(HomeBodyContainer);
