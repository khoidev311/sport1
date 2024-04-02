import { random } from "lodash";

import { ResponseDataType } from "@interfaces/Common";
import { ScoreDataType } from "@interfaces/Common/scoreType";

import { fakeDataTeamLaliga, fakeDataTeamPremierLeague } from "./teamService";

const fakeData = Array.from({ length: 16 }).map((_, index) => ({
  uuid: index,
  host_team: fakeDataTeamLaliga[index],
  guest_team: index === 19 ? fakeDataTeamLaliga[0] : fakeDataTeamLaliga[index + 1],
  score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
}));

const getScores = async () =>
  new Promise<ResponseDataType<ScoreDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: fakeData,
        meta: {
          total: fakeData.length,
        },
      });
    }, 1000);
  });

const fakeDataScorePremierLeague = fakeDataTeamPremierLeague.map((item, index) => ({
  uuid: index,
  host_team: item,
  guest_team: index === 19 ? fakeDataTeamPremierLeague[0] : fakeDataTeamPremierLeague[index + 1],
  score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
}));

const fakeDataScoreLaliga = fakeDataTeamLaliga.map((item, index) => ({
  uuid: index,
  host_team: item,
  guest_team: index === 19 ? fakeDataTeamLaliga[0] : fakeDataTeamLaliga[index + 1],
  score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
}));

const getScoreById = async (leagueId: number) =>
  new Promise<ResponseDataType<ScoreDataType[]>>((resolve) => {
    setTimeout(() => {
      let fakeDataScore: ScoreDataType[];
      switch (leagueId) {
        case 1:
          fakeDataScore = fakeDataScorePremierLeague;
          break;
        case 2:
          fakeDataScore = fakeDataScoreLaliga;
          break;
        default:
          fakeDataScore = [];
      }
      resolve({
        data: fakeDataScore,
        meta: {
          total: fakeDataScore.length,
        },
      });
    }, 1000);
  });

const getScoreOfMatchById = async (id: number) =>
  new Promise<ScoreDataType>((resolve) => {
    setTimeout(() => {
      resolve(fakeData.find((item) => item.uuid === id) as ScoreDataType);
    }, 1000);
  });

export { getScores, getScoreById, getScoreOfMatchById };
