import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { BadgeProps } from "./interface";

const Badge = ({ status, children }: BadgeProps) => {
  const statusClassName = useMemo(() => {
    if (status === "success") {
      return "text-green-500 bg-green-100 border-green-500";
    }

    if (status === "warning") {
      return "text-yellow-500 bg-yellow-100 border-yellow-500";
    }

    if (status === "danger") {
      return "text-red-500 bg-red-100 border-red-500";
    }

    if (status === "disabled") {
      return "text-gray-500 bg-gray-100 border-gray-500";
    }

    return "text-blue-500 bg-blue-100 border-blue-500";
  }, [status]);

  return (
    <div className={twMerge(statusClassName, "inline-block rounded-primary px-4 py-1 text-xs font-semibold")}>
      {children}
    </div>
  );
};

export default memo(Badge);
