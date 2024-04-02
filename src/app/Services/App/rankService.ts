import { ResponseDataType } from "@interfaces/Common";
import { RankDataType } from "@interfaces/Common/rankType";

import { fakeDataTeamLaliga, fakeDataTeamPremierLeague } from "./teamService";

const fakeDataRankPremierLeague: RankDataType[] = fakeDataTeamPremierLeague.map((item, index) => ({
  uuid: index,
  rank: index + 1,
  win: 26,
  lost: 10,
  draw: 2,
  efficiency: 40,
  goal: 52,
  point: 80 - index,
  history_match: ["W", "W", "L", "D", "D"],
  total_match: 40,
  team: item,
}));

const fakeDataRankLaLiga: RankDataType[] = fakeDataTeamLaliga.map((item, index) => ({
  uuid: index,
  rank: index + 1,
  win: 26,
  lost: 10,
  draw: 2,
  efficiency: 40,
  goal: 52,
  point: 80 - index,
  history_match: ["W", "W", "L", "D", "D"],
  total_match: 40,
  team: item,
}));

const getRank = async (leagueId: number) =>
  new Promise<ResponseDataType<RankDataType[]>>((resolve) => {
    setTimeout(() => {
      let fakeData: RankDataType[];
      switch (leagueId) {
        case 1:
          fakeData = fakeDataRankPremierLeague;
          break;
        case 2:
          fakeData = fakeDataRankLaLiga;
          break;
        default:
          fakeData = [];
      }
      resolve({
        data: fakeData,
        meta: {
          total: fakeData.length,
        },
      });
    }, 1000);
  });

export { getRank };
