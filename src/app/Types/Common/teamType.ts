import { Omit } from "lodash";
import { Key } from "react";

import { BaseDataType, Nullable } from "./commonType";
import { LeagueDataType } from "./leagueType";

export interface TeamDataType extends BaseDataType {
  name: string;
  logo: string;
  league: LeagueDataType;
}

export interface TeamFormDataType extends Nullable<Partial<Omit<TeamDataType, "league">>> {
  league: Key;
}
