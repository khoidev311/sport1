import { axiosInstance } from "@utils/Axios";
import { BaseListQueryType, UserFormDataType } from "@interfaces/Common";

import { USER_API_PATH } from "../../Constants/apiConstant";

const getUsers = async (params?: BaseListQueryType) => {
  const response = await axiosInstance.get(USER_API_PATH.USERS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createUser = async (data: UserFormDataType) => {
  await axiosInstance.post(USER_API_PATH.USERS, {
    ...data,
  });
};
const editUser = async (id: number, data: UserFormDataType) => {
  await axiosInstance.put(USER_API_PATH.USERS_ID(id), data);
};
const deleteUser = async (id: number) => {
  await axiosInstance.delete(USER_API_PATH.USERS_ID(id));
};

export { createUser, getUsers, editUser, deleteUser };
