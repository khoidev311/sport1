import { BaseDataType } from "./commonType";
import { TeamDataType } from "./teamType";

export interface ScoreDataType extends BaseDataType {
  uuid: number;
  host_team: TeamDataType;
  guest_team: TeamDataType;
  score: string;
}
