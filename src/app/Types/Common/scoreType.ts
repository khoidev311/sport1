import { Key } from "react";

import { BaseDataType, Nullable } from "./commonType";
import { TeamDataType } from "./teamType";
import { LeagueDataType } from "./leagueType";

export interface ScoreDataType extends BaseDataType {
  host_team: TeamDataType;
  guest_team: TeamDataType;
  score: string;
  league: LeagueDataType;
}

export interface ScoreFormDataType extends Nullable<Partial<Pick<ScoreDataType, "score">>> {
  host_team: Key;
  guest_team: Key;
  league: Key;
}
