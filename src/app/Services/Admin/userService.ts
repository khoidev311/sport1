import { DataStatusEnum } from "@enums/commonEnum";
import { UserRoleEnum } from "@enums/userEnum";
import { BaseListQueryType, ResponseDataType, UserDataType, UserFormDataType } from "@interfaces/Common";

const getFakeData = (pageSize: number): UserDataType[] =>
  Array.from({ length: pageSize }).map((_, index) => ({
    id: index,
    email: `encacap_${index}@gmail.com`,
    phone: `012345678${index}`,
    fullName: "Trần Văn E",
    avatar: "https://i.pinimg.com/474x/68/f0/93/68f093dd88a7753a738075954abfb101.jpg",
    role: {
      id: 1,
      name: UserRoleEnum.ADMIN,
      slug: UserRoleEnum.ADMIN,
    },
    status: DataStatusEnum.ACTIVATED,
  }));

const getUsers = async (params?: BaseListQueryType) =>
  new Promise<ResponseDataType<UserDataType[]>>((resolve) => {
    setTimeout(() => {
      const fakeData = getFakeData(params?.pageSize ?? 10);
      resolve({
        data: fakeData,
        meta: {
          total: fakeData.length,
        },
      });
    }, 1000);
  });

const createUser = async (data: UserFormDataType) =>
  new Promise<UserFormDataType>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });

const updateUserById = async (id: number, data: UserFormDataType) =>
  new Promise<UserFormDataType>((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id });
    }, 1000);
  });

export { createUser, getUsers, updateUserById };
