import { BaseDataType } from "./commonType";
import { LeagueDataType } from "./leagueType";
import { TeamDataType } from "./teamType";

export interface FixtureDataType extends BaseDataType {
  uuid: number;
  host_team: TeamDataType;
  guest_team: TeamDataType;
  start_time: string;
  league: LeagueDataType;
}
