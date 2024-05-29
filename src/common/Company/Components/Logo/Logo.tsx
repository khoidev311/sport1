import { HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
}

const Logo = ({ className, imageClassName }: LogoProps) => {
  return (
    <div className={className}>
      <div className={twMerge("inline-flex text-3xl font-bold h-12 w-36  text-app", imageClassName)}>
        SPORT1
      </div>
    </div>
  );
};

export default memo(Logo);
