import { memo, useMemo } from "react";

import { ComponentStatusType } from "@components/interface";
import { DataStatusEnum } from "@enums/commonEnum";

import Badge from "./Badge";
import { BadgeDataStatusProps } from "./interface";

const BadgeDataStatus = ({ status, children }: BadgeDataStatusProps) => {
  const mappedStatus: ComponentStatusType = useMemo(() => {
    if (status === DataStatusEnum.ACTIVATED) {
      return "success";
    }

    return "danger";
  }, [status]);

  return <Badge status={mappedStatus}>{children}</Badge>;
};

export default memo(BadgeDataStatus);
