import { Dayjs } from "dayjs";
import { Children, ReactElement, cloneElement, memo, useCallback } from "react";

interface TimelineEventContainerProps {
  children: ReactElement | ReactElement[];
  currentHoverTime: Dayjs | null;
  calculateEventMarginLeft: (eventStartHour: Dayjs) => number;
  calculateEventWidth: (eventStartHour: Dayjs, eventEndHour: Dayjs) => string;
}

const TimelineEventContainer = ({
  children,
  currentHoverTime,
  calculateEventMarginLeft,
  calculateEventWidth,
}: TimelineEventContainerProps) => {
  const checkIsEventHovering = useCallback(
    (startHour: Dayjs, endHour: Dayjs) => {
      if (!currentHoverTime || !endHour) return false;

      const currentTimeAddOneMinute = currentHoverTime.subtract(1, "minute");

      return currentHoverTime.isAfter(startHour) && currentTimeAddOneMinute.isBefore(endHour);
    },
    [currentHoverTime],
  );

  return (
    <div className="group/timeline-event relative z-10 flex w-full flex-col lg:mt-3 lg:space-y-4 lg:px-0 lg:pb-4 lg:pt-16">
      {Children.map(children, (child) =>
        cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            marginLeft: `${calculateEventMarginLeft(child.props.startHour)}px`,
            width: calculateEventWidth(child.props.startHour, child.props.endHour),
          },
          isHovering: checkIsEventHovering(child.props.startHour, child.props.endHour),
        }),
      )}
    </div>
  );
};

export default memo(TimelineEventContainer);
