import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const HomeScoreboardItemSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-3 py-4 border-b">
      <div className="col-span-2 grid grid-cols-8 h-fit ">
        <div className="col-span-3 flex justify-end px-4">
          <LoadingSkeleton className="w-full h-7 rounded-full" />
        </div>
        <div className="col-span-2 flex justify-center px-8">
          <LoadingSkeleton className="w-full h-7 rounded-full" />
        </div>
        <div className="col-span-3 flex justify-start px-4">
          <LoadingSkeleton className="w-full h-7 rounded-full" />
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <LoadingSkeleton className="w-28 h-7 rounded-full" />
      </div>
    </div>
  );
};
export default memo(HomeScoreboardItemSkeleton);
