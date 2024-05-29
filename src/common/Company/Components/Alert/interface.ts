import { HTMLAttributes, ReactNode } from "react";

import { ComponentStatusType } from "@components/interface";

export interface AlertProps extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  type?: ComponentStatusType;
  title: string;
  message?: string;
  children?: ReactNode;
}
