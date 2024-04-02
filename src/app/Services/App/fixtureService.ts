import { ResponseDataType } from "@interfaces/Common";
import { FixtureDataType } from "@interfaces/Common/fixrureType";

import { fakeDataTeamLaliga, fakeDataTeamPremierLeague } from "./teamService";

const getFakeDataLaliga = (pageSize: number): FixtureDataType[] =>
  Array.from({ length: pageSize }).map((_, index) => ({
    uuid: index,
    host_team: fakeDataTeamLaliga[index],
    guest_team: fakeDataTeamLaliga[index + 1],
    start_time: "2024-03-26T05:30:01+00:00",
    league: {
      uuid: 2,
      name: "Laliga",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGRAT9_cBRZVyxnwwxDlQk0HuBGLTXtSq8gcTZ7iJxw&s",
    },
  }));

const getFakeDataPrimierLeague = (pageSize: number): FixtureDataType[] =>
  Array.from({ length: pageSize }).map((_, index) => ({
    uuid: index,
    host_team: fakeDataTeamPremierLeague[index],
    guest_team: fakeDataTeamPremierLeague[index + 1],
    start_time: "2024-03-26T05:30:01+00:00",
    league: {
      uuid: 1,
      name: "Primier League",
      logo: "https://seeklogo.com/images/P/premier-league-new-logo-D22A0CE87E-seeklogo.com.png",
    },
  }));

const getFixtures = async (leagueId: number) =>
  new Promise<ResponseDataType<FixtureDataType[]>>((resolve) => {
    setTimeout(() => {
      let fakeData: FixtureDataType[];
      switch (leagueId) {
        case 1:
          fakeData = getFakeDataPrimierLeague(10);
          break;
        case 2:
          fakeData = getFakeDataLaliga(10);
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

export { getFixtures };
