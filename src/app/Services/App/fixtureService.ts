import { Key } from "react";

import { FIXTURE_API_PATH } from "@constants/apiConstant";
import { BaseListQueryType, ResponseDataType } from "@interfaces/Common";
import { FixtureDataType, FixtureFormDataType } from "@interfaces/Common/fixrureType";
import { axiosInstance } from "@utils/Axios";

const getFixtures = async (params?: BaseListQueryType): Promise<ResponseDataType<FixtureDataType[]>> => {
  const response = await axiosInstance.get(FIXTURE_API_PATH.FIXTURES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getFixtureByLeagueId = async (id: Key): Promise<ResponseDataType<FixtureDataType[]>> => {
  const response = await axiosInstance.get(FIXTURE_API_PATH.FIXTURES_BY_LEAGUE_ID(id));
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createFixture = async (data: FixtureFormDataType) => {
  await axiosInstance.post(FIXTURE_API_PATH.FIXTURES, data);
};

const editFixture = async (id: number, data: FixtureFormDataType) => {
  await axiosInstance.put(FIXTURE_API_PATH.FIXTURES_ID(id), data);
};

const deleteFixture = async (id: number) => {
  await axiosInstance.delete(FIXTURE_API_PATH.FIXTURES_ID(id));
};

export { getFixtures, createFixture, editFixture, deleteFixture, getFixtureByLeagueId };
