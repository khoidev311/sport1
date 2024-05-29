import { ROLE_API_PATH } from "@constants/apiConstant";
import {
  BaseListQueryType,
  ResponseDataType,
  UserRoleDataType,
  UserRoleFormDataType,
} from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const getRoles = async (params?: BaseListQueryType): Promise<ResponseDataType<UserRoleDataType[]>> => {
  const response = await axiosInstance.get(ROLE_API_PATH.ROLES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createRole = async (data: UserRoleFormDataType) => {
  await axiosInstance.post(ROLE_API_PATH.ROLES, data);
};

const editRole = async (id: number, data: UserRoleFormDataType) => {
  await axiosInstance.put(ROLE_API_PATH.ROLES_ID(id), data);
};

const deleteRole = async (id: number) => {
  await axiosInstance.delete(ROLE_API_PATH.ROLES_ID(id));
};

export { getRoles, createRole, deleteRole, editRole };
