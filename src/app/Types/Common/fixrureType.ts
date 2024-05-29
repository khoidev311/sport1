import { Key } from "react";

import { BaseDataType, Nullable } from "./commonType";
import { LeagueDataType } from "./leagueType";
import { TeamDataType } from "./teamType";

export interface FixtureDataType extends BaseDataType {
  host_team: TeamDataType;
  guest_team: TeamDataType;
  start_time: string;
  league: LeagueDataType;
}

export interface FixtureFormDataType extends Nullable<Partial<Pick<FixtureDataType, "start_time">>> {
  host_team: Key;
  guest_team: Key;
  league: Key;
}
