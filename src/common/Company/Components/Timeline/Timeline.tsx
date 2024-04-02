import { Dayjs } from "dayjs";
import { max } from "lodash";
import { MouseEvent, memo, useCallback, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { getTwScreenWidth } from "@utils/Helpers/commonHelper";

import TimelineEventContainer from "./EventContainer";
import TimelineHour from "./Hour";
import { TimelineProps } from "./interface";

const Timeline = ({ children, isShowMinuteLine, endHour, startHour }: TimelineProps) => {
  const [connerWidth, setConnerWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentHoverTime, setCurrentHoverTime] = useState<Dayjs | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentTimeLineRef = useRef<HTMLDivElement>(null);

  const currentHoverTimeString = useMemo(() => {
    if (!currentHoverTime) return "";

    return currentHoverTime.format("HH:mm");
  }, [currentHoverTime]);
  const maxHours = useMemo(() => endHour.diff(startHour, "hour") + 1, [endHour, startHour]);
  const oneHourBeforeStartHour = useMemo(() => startHour.subtract(1, "hour"), [startHour]);
  const oneHourAfterEndHour = useMemo(() => endHour.add(1, "hour"), [endHour]);
  const minuteWidth = useMemo(() => {
    if (!containerRef.current) return 0;

    const remainingWidth = containerRef.current.clientWidth - connerWidth * 2;
    const minutes = maxHours * 60;

    return remainingWidth / minutes;
  }, [connerWidth, maxHours]);

  const handleLoadConner = useCallback((target: HTMLDivElement) => {
    const { width } = target.getBoundingClientRect();

    setConnerWidth(width);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentTimeLineElement = currentTimeLineRef.current;
      const containerElement = containerRef.current;

      if (!currentTimeLineElement || !containerElement) return;

      const { left } = containerElement.getBoundingClientRect();
      const { clientX } = e;
      const innerLeft = clientX - left;

      currentTimeLineElement.style.left = `${clientX - left}px`;

      // If `clientX` is less than `connerWidth`, set `currentTimeLineString` to `startHour`
      if (innerLeft < connerWidth) {
        setCurrentHoverTime(oneHourBeforeStartHour);
        return;
      }

      // If `clientX` is greater than `containerElement.clientWidth - connerWidth`, set `currentTimeLineString` to `oneHourAfterEndHour`
      if (innerLeft > containerElement.clientWidth - connerWidth) {
        setCurrentHoverTime(oneHourAfterEndHour);
        return;
      }

      const minutes = Math.floor((innerLeft - connerWidth) / minuteWidth);
      setCurrentHoverTime(startHour.add(minutes + 1, "minute"));
    },
    [connerWidth, minuteWidth, oneHourAfterEndHour, oneHourBeforeStartHour, startHour],
  );

  const calculateEventMarginLeft = useCallback(
    (eventStartHour: Dayjs) => {
      const minutes = eventStartHour.diff(startHour, "minute");

      return max([connerWidth + minutes * minuteWidth - 1, 0]) as number;
    },
    [connerWidth, minuteWidth, startHour],
  );

  const calculateEventWidth = useCallback(
    (eventStartHour: Dayjs, eventEndHour?: Dayjs): string => {
      const windowWidth = window.document.body.clientWidth;
      const tailwindMdWidth = getTwScreenWidth("md");

      if (windowWidth < tailwindMdWidth) return "100%";

      if (!eventEndHour) return "fit";

      const minutes = eventEndHour.diff(eventStartHour, "minute");

      return `${minutes * minuteWidth}px`;
    },
    [minuteWidth],
  );

  const handleMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="relative overflow-hidden border-gray-100 lg:rounded-b-lg lg:border-2"
      onMouseMove={handleMouseMove}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleMouseOver}
      onBlur={handleMouseOut}
      ref={containerRef}
    >
      <div className="absolute inset-0 items-start lg:flex">
        <TimelineHour
          isShowMinuteLine={false}
          isShowHour={false}
          time={oneHourBeforeStartHour}
          style={{
            width: `calc(100% / ${maxHours} / 7)`,
          }}
          onLoad={handleLoadConner}
        />
        {Array.from(Array(maxHours).keys()).map((hour) => (
          <TimelineHour
            key={hour}
            isShowMinuteLine={isShowMinuteLine}
            time={startHour.add(hour, "hour")}
            style={{
              width: `calc((100% - (100% / ${maxHours} / 7) * 2) / ${maxHours})`,
            }}
          />
        ))}
        <TimelineHour
          isShowMinuteLine={false}
          isShowHour={false}
          time={oneHourAfterEndHour}
          style={{
            width: `calc((100% / ${maxHours} / 7) + 1px)`,
          }}
        />
      </div>
      <TimelineEventContainer
        calculateEventMarginLeft={calculateEventMarginLeft}
        calculateEventWidth={calculateEventWidth}
        currentHoverTime={isMouseOver ? currentHoverTime : null}
      >
        {children}
      </TimelineEventContainer>
      <div
        className={twMerge("absolute inset-y-0 hidden md:block", !isMouseOver && "hidden md:hidden")}
        ref={currentTimeLineRef}
      >
        <div className="absolute bottom-0 top-14 border-l-2 border-primary-700" />
        {currentHoverTimeString && (
          <div className="flex h-14 items-center justify-start">
            <div className="rounded-md bg-primary-700 px-3 py-1 text-sm font-semibold text-white">
              {currentHoverTimeString}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Timeline);
