import { BaseDataType } from "./commonType";
import { TeamDataType } from "./teamType";

export interface RankDataType extends BaseDataType {
  uuid: number;
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
}
