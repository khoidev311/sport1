import { memo, useState } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";
import { defaultLeague } from "@utils/Helpers/commonHelper";

import HomeLeagues from "./League/HomeLeagues";
import HomeBodyRoute from "./HomeBodyRoute";

const HomeBodyContainer = () => {
  const [selectLeague, setSelectLeague] = useState<LeagueDataType>(defaultLeague);
  return (
    <div className="w-full h-fit  px-40 gap-x-6 grid grid-cols-4 pb-6">
      <HomeLeagues onSelectLeague={setSelectLeague} league={selectLeague} />
      <HomeBodyRoute league={selectLeague} />
    </div>
  );
};
export default memo(HomeBodyContainer);
