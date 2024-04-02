import { DataStatusEnum } from "@enums/commonEnum";
import { UserRoleEnum } from "@enums/userEnum";

import { Nullable } from "./commonType";

export interface UserRoleDataType {
  id: number;
  name: string;
  slug: UserRoleEnum;
}

export interface UserDataType {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRoleDataType;
  avatar?: string;
  status: DataStatusEnum;
  createdAt?: string;
}

export interface UserFormDataType extends Nullable<Partial<UserDataType>> {
  password?: string;
}
