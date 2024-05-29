// import { random } from "lodash";

// import { ResponseDataType } from "@interfaces/Common";
// import { ScoreDataType } from "@interfaces/Common/scoreType";

// import { fakeDataTeamLaliga, fakeDataTeamPremierLeague } from "./teamService";

// const fakeData = Array.from({ length: 16 }).map((_, index) => ({
//   _id: index,
//   host_team: fakeDataTeamLaliga[index],
//   guest_team: index === 19 ? fakeDataTeamLaliga[0] : fakeDataTeamLaliga[index + 1],
//   score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
// }));

// const getScores = async () =>
//   new Promise<ResponseDataType<ScoreDataType[]>>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         data: fakeData,
//         meta: {
//           total: fakeData.length,
//         },
//       });
//     }, 1000);
//   });

// const fakeDataScorePremierLeague = fakeDataTeamPremierLeague.map((item, index) => ({
//   _id: index,
//   host_team: item,
//   guest_team: index === 19 ? fakeDataTeamPremierLeague[0] : fakeDataTeamPremierLeague[index + 1],
//   score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
// }));

// const fakeDataScoreLaliga = fakeDataTeamLaliga.map((item, index) => ({
//   _id: index,
//   host_team: item,
//   guest_team: index === 19 ? fakeDataTeamLaliga[0] : fakeDataTeamLaliga[index + 1],
//   score: `${Math.floor(random(5))} - ${Math.floor(random(5))}`,
// }));

// const getScoreById = async (leagueId: number | string) =>
//   new Promise<ResponseDataType<ScoreDataType[]>>((resolve) => {
//     setTimeout(() => {
//       let fakeDataScore: ScoreDataType[];
//       switch (leagueId) {
//         case 1:
//           fakeDataScore = fakeDataScorePremierLeague;
//           break;
//         case 2:
//           fakeDataScore = fakeDataScoreLaliga;
//           break;
//         default:
//           fakeDataScore = [];
//       }
//       resolve({
//         data: fakeDataScore,
//         meta: {
//           total: fakeDataScore.length,
//         },
//       });
//     }, 1000);
//   });

// const getScoreOfMatchById = async (id: number) =>
//   new Promise<ScoreDataType>((resolve) => {
//     setTimeout(() => {
//       resolve(fakeData.find((item) => item._id === id) as ScoreDataType);
//     }, 1000);
//   });

// export { getScores, getScoreById, getScoreOfMatchById };

// import { ResponseDataType } from "@interfaces/Common";
// import { ScoreDataType } from "@interfaces/Common/rankType";

import { Key } from "react";

import { SCORE_API_PATH } from "@constants/apiConstant";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { ScoreDataType, ScoreFormDataType } from "@interfaces/Common/scoreType";
import { axiosInstance } from "@utils/Axios";

// import { fakeDataScoreLaliga, fakeDataScorePremierLeague } from "./teamService";

// const fakeDataScorePremierLeague: ScoreDataType[] = fakeDataScorePremierLeague.map((item, index) => ({
//   _id: index,
//   rank: index + 1,
//   win: 26,
//   lost: 10,
//   draw: 2,
//   efficiency: 40,
//   goal: 52,
//   point: 80 - index,
//   history_match: ["W", "W", "L", "D", "D"],
//   total_match: 40,
//   team: item,
// }));

// const fakeDataScoreLaLiga: ScoreDataType[] = fakeDataScoreLaliga.map((item, index) => ({
//   _id: index,
//   rank: index + 1,
//   win: 26,
//   lost: 10,
//   draw: 2,
//   efficiency: 40,
//   goal: 52,
//   point: 80 - index,
//   history_match: ["W", "W", "L", "D", "D"],
//   total_match: 40,
//   team: item,
// }));

// const getScore = async (leagueId: number | string) =>
//   new Promise<ResponseDataType<ScoreDataType[]>>((resolve) => {
//     setTimeout(() => {
//       let fakeData: ScoreDataType[];
//       switch (leagueId) {
//         case 1:
//           fakeData = fakeDataScorePremierLeague;
//           break;
//         case 2:
//           fakeData = fakeDataScoreLaLiga;
//           break;
//         default:
//           fakeData = [];
//       }
//       resolve({
//         data: fakeData,
//         meta: {
//           total: fakeData.length,
//         },
//       });
//     }, 1000);
//   });

// export { getScore };

const getScores = async (params?: BaseListQueryType): Promise<ResponseDataType<ScoreDataType[]>> => {
  const response = await axiosInstance.get(SCORE_API_PATH.SCORES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getScoreById = async (id: Key): Promise<ScoreDataType> => {
  const response = await axiosInstance.get(SCORE_API_PATH.SCORES_ID(id));
  return response.data;
};

const getScoreByLeagueId = async (id: Key): Promise<ResponseDataType<ScoreDataType[]>> => {
  const response = await axiosInstance.get(SCORE_API_PATH.SCORES_BY_LEAGUE_ID(id));
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createScore = async (data: ScoreFormDataType) => {
  await axiosInstance.post(SCORE_API_PATH.SCORES, data);
};

const editScore = async (id: number, data: ScoreFormDataType) => {
  await axiosInstance.put(SCORE_API_PATH.SCORES_ID(id), data);
};

const deleteScore = async (id: number) => {
  await axiosInstance.delete(SCORE_API_PATH.SCORES_ID(id));
};

export { getScores, createScore, editScore, deleteScore, getScoreById, getScoreByLeagueId };
