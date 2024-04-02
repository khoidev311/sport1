import { BaseDataType } from "./commonType";

export interface LeagueDataType extends BaseDataType {
  uuid: number;
  logo: string;
  name: string;
}
