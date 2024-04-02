import { memo, useState } from "react";

import { LeagueDataType } from "@interfaces/Common/leagueType";
import { TabFeatureEnum } from "@enums/commonEnum";

import HomeBodyHeader from "./HomeBodyHeader";
import HomeFixtures from "./Fixture/HomeFixtures";
import HomeScoreboard from "./Scoreboard/HomeScoreboard";
import HomeRanking from "./Ranking/HomeRanking";

interface HomeBodyRouteProps {
  league: LeagueDataType;
}

const HomeBodyRoute = ({ league }: HomeBodyRouteProps) => {
  const [activeTab, setActiveTab] = useState<TabFeatureEnum>(TabFeatureEnum.SCOREBOARD);
  return (
    <div className="col-span-3 h-auto">
      <HomeBodyHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === TabFeatureEnum.FIXTURES && <HomeFixtures league={league} />}
      {activeTab === TabFeatureEnum.SCOREBOARD && <HomeScoreboard league={league} />}
      {activeTab === TabFeatureEnum.RANKING && <HomeRanking league={league} />}
    </div>
  );
};
export default memo(HomeBodyRoute);
