// import { ResponseDataType } from "@interfaces/Common";
// import { RankDataType } from "@interfaces/Common/rankType";

import { Key } from "react";

import { RANK_API_PATH } from "@constants/apiConstant";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { RankDataType, RankFormDataType } from "@interfaces/Common/rankType";
import { axiosInstance } from "@utils/Axios";

const getRanks = async (params?: BaseListQueryType): Promise<ResponseDataType<RankDataType[]>> => {
  const response = await axiosInstance.get(RANK_API_PATH.RANKS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getRankByLeagueId = async (id: Key): Promise<ResponseDataType<RankDataType[]>> => {
  const response = await axiosInstance.get(RANK_API_PATH.RANKS_BY_LEAGUE_ID(id));
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createRank = async (data: RankFormDataType) => {
  await axiosInstance.post(RANK_API_PATH.RANKS, data);
};

const editRank = async (id: number, data: RankFormDataType) => {
  await axiosInstance.put(RANK_API_PATH.RANKS_ID(id), data);
};

const deleteRank = async (id: number) => {
  await axiosInstance.delete(RANK_API_PATH.RANKS_ID(id));
};

export { getRanks, createRank, editRank, deleteRank, getRankByLeagueId };
