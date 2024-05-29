import { ResponseDataType, BaseListQueryType } from "@interfaces/Common";
import { LEAGUE_API_PATH } from "@constants/apiConstant";
import { axiosInstance } from "@utils/Axios";
import { LeagueDataType, LeagueFormDataType } from "@interfaces/Common/leagueType";

const getLeagues = async (params?: BaseListQueryType): Promise<ResponseDataType<LeagueDataType[]>> => {
  const response = await axiosInstance.get(LEAGUE_API_PATH.LEAGUES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createLeague = async (data: LeagueFormDataType) => {
  await axiosInstance.post(LEAGUE_API_PATH.LEAGUES, data);
};

const editLeague = async (id: number, data: LeagueFormDataType) => {
  await axiosInstance.put(LEAGUE_API_PATH.LEAGUES_ID(id), data);
};

const deleteLeague = async (id: number) => {
  await axiosInstance.delete(LEAGUE_API_PATH.LEAGUES_ID(id));
};

export { getLeagues, createLeague, deleteLeague, editLeague };
