import { ButtonHTMLAttributes, ReactNode } from "react";

import { ComponentColorType, ComponentSizeType } from "@components/interface";

export interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "disabled" | "type"> {
  color?: ComponentColorType;
  children: ReactNode;
  isLoading?: boolean;
  size?: ComponentSizeType;
}
