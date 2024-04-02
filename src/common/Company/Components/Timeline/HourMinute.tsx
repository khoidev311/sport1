import { HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

const TimelineHourMinute = ({ className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "onMouseOver">) => {
  return (
    <div className={twMerge("h-full border-dotted border-gray-200 last:border-r-0", className)} {...props} />
  );
};

export default memo(TimelineHourMinute);
