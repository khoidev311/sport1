import { ReactNode } from "react";

import { ComponentStatusType } from "@components/interface";
import { DataStatusEnum } from "@enums/commonEnum";

export interface BadgeProps {
  status: ComponentStatusType;
  children: ReactNode;
}

export interface BadgeDataStatusProps extends Omit<BadgeProps, "status"> {
  status: DataStatusEnum;
}
