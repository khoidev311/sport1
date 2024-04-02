import { BaseDataType } from "./commonType";

export interface TeamDataType extends BaseDataType {
  uuid: number;
  name: string;
  logo: string;
}
