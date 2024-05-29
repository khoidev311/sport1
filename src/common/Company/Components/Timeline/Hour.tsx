import { Dayjs } from "dayjs";
import { HTMLAttributes, memo, useEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

import TimelineHourMinute from "./HourMinute";

interface TimelineHourProps extends Omit<HTMLAttributes<HTMLDivElement>, "onLoad"> {
  isShowMinuteLine?: boolean;
  isShowHour?: boolean;
  time: Dayjs;
  onLoad?: (target: HTMLDivElement) => void;
}

const TimelineHour = ({
  className,
  isShowMinuteLine = false,
  isShowHour,
  time,
  onLoad,
  ...props
}: TimelineHourProps) => {
  const minutes = useMemo(() => {
    if (!isShowMinuteLine) return [];

    return Array.from({
      length: 60,
    }).map((_, index) => index);
  }, [isShowMinuteLine]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onLoad?.(ref.current!);
  }, [onLoad]);

  return (
    <div
      className={twMerge(className, "group/timeline-time relative hidden h-full flex-col lg:flex")}
      ref={ref}
      {...props}
    >
      <div className="relative border-b-2 border-gray-100">
        <div className={twMerge("py-4 text-center font-semibold", isShowHour === false && "opacity-0")}>
          {time.format("HH:mm")}
        </div>
        <div className="absolute bottom-0.5 left-0 h-4 w-0 border-l-2 border-gray-100 group-first/timeline-time:hidden" />
      </div>
      <div
        className={twMerge(
          "flex h-full w-full flex-1 items-start border-dotted bg-gray-50 group-last/timeline-time:border-l-2",
          !isShowMinuteLine && "border-l-2 group-first/timeline-time:border-l-0",
        )}
      >
        {minutes.map((minute) => (
          <TimelineHourMinute
            key={minute}
            style={{ width: `calc(100% / ${minutes.length})` }}
            className={twMerge(minute % 10 === 0 && "border-l-2")}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TimelineHour);
