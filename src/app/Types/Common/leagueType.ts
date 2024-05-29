import { BaseDataType, Nullable } from "./commonType";

export interface LeagueDataType extends BaseDataType {
  logo: string;
  name: string;
}

export interface LeagueFormDataType extends Nullable<Partial<LeagueDataType>> {}
