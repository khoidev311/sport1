import { Dayjs } from "dayjs";
import { HTMLAttributes, ReactElement } from "react";

export interface TimelineProps {
  children: ReactElement | ReactElement[];
  isShowMinuteLine?: boolean;
  startHour: Dayjs;
  endHour: Dayjs;
}

export interface TimelineEventProps extends HTMLAttributes<HTMLDivElement> {
  startHour: Dayjs;
  endHour?: Dayjs;
  isHovering?: boolean;
}
