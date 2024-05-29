import { Key } from "react";

import { BaseDataType, Nullable } from "./commonType";
import { LeagueDataType } from "./leagueType";
import { TeamDataType } from "./teamType";

export interface RankDataType extends BaseDataType {
  team: TeamDataType;
  rank: number;
  total_match: number;
  win: number;
  draw: number;
  lost: number;
  goal: number;
  efficiency: number;
  point: number;
  history_match: string[];
  league: LeagueDataType;
}

interface RankFormConverseType extends Omit<RankDataType, "team"> {}

export interface RankFormDataType extends Nullable<Partial<Omit<RankFormConverseType, "league">>> {
  team: Key;
  league: Key;
}
