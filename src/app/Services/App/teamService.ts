// const fakeDataTeamLaliga: TeamDataType[] = [
//   {
//     _id: 1,
//     name: "Real Madrid",
//     logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/716px-Logo_Real_Madrid.svg.png",
//   },
//   {
//     _id: 2,
//     name: "Barcelona",
//     logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/FC_Barcelona_logo.svg/716px-FC_Barcelona_logo.svg.png",
//   },
//   {
//     _id: 3,
//     name: "Sevilla",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/sevilla_35x35.png",
//   },
//   {
//     _id: 4,
//     name: "Celta de Vigo",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/celta-de-vigo_35x35.png",
//   },
//   {
//     _id: 5,
//     name: "Las Palmas",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2023/hungnq/2023-08-18/101953903_las_palmas_35x35.png",
//   },
//   {
//     _id: 6,
//     name: "Sevilla",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2022/kytq1/2022-08-15/151207974_almer--a_35x35.png",
//   },
//   {
//     _id: 7,
//     name: "Villarreal",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2023/hungnq/2023-08-18/101953903_las_palmas_35x35.png",
//   },
//   {
//     _id: 8,
//     name: "Valencia",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/valencia_35x35.png",
//   },
//   {
//     _id: 9,
//     name: "Rayo Vallecano",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2021/kytq1/2021-08-25/091347509_rayo-vallecano_35x35.png",
//   },
//   {
//     _id: 10,
//     name: "Real Betis",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/real-betis_35x35.png",
//   },
//   {
//     _id: 11,
//     name: "Atlético Madrid",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/atl--tico-madrid_35x35.png",
//   },
//   {
//     _id: 12,
//     name: "Cádiz",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/cadiz_35x35.png",
//   },
//   {
//     _id: 13,
//     name: "Granada",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/granada_35x35.png",
//   },
//   {
//     _id: 14,
//     name: "Getafe",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/getafe_35x35.png",
//   },
//   {
//     _id: 15,
//     name: "Osasuna",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/osasuna_35x35.png",
//   },
//   {
//     _id: 16,
//     name: "Almería",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2022/kytq1/2022-08-15/151207974_almer--a_35x35.png",
//   },
//   {
//     _id: 17,
//     name: "Mallorca",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2021/kytq1/2021-08-25/091239433_mallorca_35x35.png",
//   },
//   {
//     _id: 18,
//     name: "Girona",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2022/kytq1/2022-08-15/151200126_girona_35x35.png",
//   },
//   {
//     _id: 19,
//     name: "Deportivo Alavés",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/deportivo-la-coruna_35x35.png",
//   },
//   {
//     _id: 20,
//     name: "Real Sociedad",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/real-sociedad_35x35.png",
//   },
// ];

import { TEAM_API_PATH } from "@constants/apiConstant";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { TeamDataType, TeamFormDataType } from "@interfaces/Common/teamType";
import { axiosInstance } from "@utils/Axios";

// const fakeDataTeamPremierTeam: TeamDataType[] = [
//   {
//     _id: 1,
//     name: "Newcastle United",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-26/newcastle-united_35x35.png",
//   },
//   {
//     _id: 2,
//     name: "West Ham United",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/west-ham-united_35x35.png",
//   },
//   {
//     _id: 3,
//     name: "AFC Bournemouth",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/afc-bournemout_35x35.png",
//   },
//   {
//     _id: 4,
//     name: "Everton",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/everton_35x35.png",
//   },
//   {
//     _id: 5,
//     name: "Chelsea",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-26/chelsea_35x35.png",
//   },
//   {
//     _id: 6,
//     name: "Burnley",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/burnley_35x35.jpg",
//   },
//   {
//     _id: 7,
//     name: "Nottingham Forest",
//     logo: "https://icdn.24h.com.vn/upload/livescore/4-2021/kytq1/2021-12-07/100222545_nottingham-forest_35x35.png",
//   },
//   {
//     _id: 8,
//     name: "Crystal Palace",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/crystal-palace_35x35.png",
//   },
//   {
//     _id: 9,
//     name: "Sheffield United",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/bladeslogo2_35x35.png",
//   },
//   {
//     _id: 10,
//     name: "Fulham",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/fulham_35x35.png",
//   },
//   {
//     _id: 11,
//     name: "Tottenham Hotspur",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/tottenham-hotspur_35x35.png",
//   },
//   {
//     _id: 12,
//     name: "Luton Town",
//     logo: "https://icdn.24h.com.vn/upload/livescore/4-2021/kytq1/2021-12-07/101039315_luton-town_35x35.png",
//   },
//   {
//     _id: 13,
//     name: "Aston Villa",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/aston-villa_35x35.png",
//   },
//   {
//     _id: 14,
//     name: "Wolverhampton Wanderers",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/wolverhampton_35x35.png",
//   },
//   {
//     _id: 15,
//     name: "Brentford",
//     logo: "https://icdn.24h.com.vn/upload/livescore/1-2022/kytq1/2022-01-18/133546356_brentford_35x35.png",
//   },
//   {
//     _id: 16,
//     name: "Manchester United",
//     logo: "https://icdn.24h.com.vn/upload/livescore/1-2022/kytq1/2022-01-18/133520435_manchester-united_35x35.png",
//   },
//   {
//     _id: 17,
//     name: "Liverpool",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/liverpool_35x35.png",
//   },
//   {
//     _id: 18,
//     name: "Brighton & Hove Albion",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/giangbt/2021-05-25/brighton---hove-albion_35x35.png",
//   },
//   {
//     _id: 19,
//     name: "Manchester City",
//     logo: "https://icdn.24h.com.vn/upload/livescore/3-2022/kytq1/2022-08-25/112424524_image_35x35.png",
//   },
//   {
//     _id: 20,
//     name: "Arsenal",
//     logo: "https://icdn.24h.com.vn/upload/livescore/2-2021/kytq1/2021-05-17/arsenal_35x35.png",
//   },
// ];
// export { fakeDataTeamLaliga, fakeDataTeamPremierTeam };

const getTeams = async (params?: BaseListQueryType): Promise<ResponseDataType<TeamDataType[]>> => {
  const response = await axiosInstance.get(TEAM_API_PATH.TEAMS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createTeam = async (data: TeamFormDataType) => {
  await axiosInstance.post(TEAM_API_PATH.TEAMS, data);
};

const editTeam = async (id: number, data: TeamFormDataType) => {
  await axiosInstance.put(TEAM_API_PATH.TEAMS_ID(id), data);
};

const deleteTeam = async (id: number) => {
  await axiosInstance.delete(TEAM_API_PATH.TEAMS_ID(id));
};

export { getTeams, createTeam, editTeam, deleteTeam };
