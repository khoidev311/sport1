import { ReactNode, memo } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface BaseStepItemProps {
  icon?: ReactNode;
}

interface StepItemProps {
  children: ReactNode;
  isFirst?: never;
  isLast?: never;
  isActive?: never;
  isFinished?: never;
  order?: never;
}

interface ClonedStepItemProps {
  order: number;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
  isFinished: boolean;
  children?: never;
}

const StepItem = ({
  children,
  icon,
  isFirst,
  isLast,
  isActive,
  isFinished,
  order,
}: BaseStepItemProps & (StepItemProps | ClonedStepItemProps)) => {
  return (
    <div
      className={twMerge(
        "relative z-0 flex w-full items-center justify-center bg-inherit",
        isFirst && "justify-start",
        isLast && "justify-end",
      )}
    >
      <div className="relative z-10 flex flex-col items-center justify-center bg-inherit">
        <div
          className={twMerge(
            "relative z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-100 bg-white font-semibold text-slate-300",
            isActive && "border-primary-700 text-primary-700",
            isFinished && "border-primary-700 bg-primary-700 text-white",
          )}
        >
          {!isFinished && !icon && order}
          {!isFinished && icon && icon}
          {isFinished && <HiOutlineCheck size={20} className="ml-px mt-px" />}
        </div>
        <div
          className={twMerge(
            "mt-2 text-sm font-semibold text-slate-300",
            (isActive || isFinished) && "text-primary-700",
          )}
        >
          {children}
        </div>
        {(!isLast || isFinished) && (
          <div
            className={twMerge(
              "absolute left-1/2 right-0 top-5 -z-10 border-t-2 border-gray-100",
              isFinished && "border-primary-700",
            )}
          />
        )}
        {!isFirst && (
          <div
            className={twMerge(
              "absolute left-0 right-1/2 top-5 -z-10 border-t-2 border-gray-100",
              (isActive || isFinished) && "border-primary-700",
            )}
          />
        )}
      </div>
      <div
        className={twMerge(
          "absolute left-0 right-1/2 top-5 border-t-2 border-gray-100",
          isFinished && "border-primary-700",
          !isFirst && isActive && "border-primary-700",
        )}
      />
      <div
        className={twMerge(
          "absolute inset-x-0 left-1/2 right-0 top-5 border-t-2 border-gray-100",
          isFinished && "border-primary-700",
          isLast && isActive && "border-primary-700",
        )}
      />
    </div>
  );
};

export default memo(StepItem);
