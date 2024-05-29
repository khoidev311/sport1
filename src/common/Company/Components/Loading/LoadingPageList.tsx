import { memo } from "react";
import { twMerge } from "tailwind-merge";

import TableFooterSkeleton from "@components/Table/TableFooterSkeleton";

import LoadingSkeleton from "./LoadingSkeleton";

interface LoadingPageListProps {
  className?: string;
}

const LoadingPageList = ({ className }: LoadingPageListProps) => {
  return (
    <div className={twMerge(className)}>
      <LoadingSkeleton className="h-14 w-full rounded-lg" />
      {Array.from({ length: 6 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex h-15 items-center space-x-6 border-b-2 border-gray-50 px-4" key={index}>
          <LoadingSkeleton className="h-5 w-5 flex-shrink-0 rounded" />
          <LoadingSkeleton className="h-4 w-full rounded-full" />
          <div className="flex items-center space-x-4">
            <LoadingSkeleton className="h-8 w-8 rounded-lg" />
            <LoadingSkeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      ))}
      <div className="mt-6">
        <TableFooterSkeleton />
      </div>
    </div>
  );
};

export default memo(LoadingPageList);
