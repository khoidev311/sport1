import { UserRoleEnum } from "@enums/userEnum";

import { BaseDataType, Nullable } from "./commonType";

export interface UserRoleDataType extends BaseDataType {
  name: UserRoleEnum;
  slug: string;
}

export interface UserRoleFormDataType extends Nullable<Partial<UserRoleDataType>> {}

export interface UserDataType extends BaseDataType {
  fullname: string;
  username: string;
  email: string;
  role: UserRoleDataType;
  avatar?: string;
}

export interface UserFormDataType extends Nullable<Partial<UserDataType>> {
  password?: string;
}
