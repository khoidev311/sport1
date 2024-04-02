import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const HomeRankingItemSkeleton = () => {
  return (
    <div className=" w-full rounded-t-md mb-1">
      <div className="w-full h-12 grid grid-cols-7 px-2">
        <div className="col-span-2  flex items-center justify-start gap-1">
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="flex-auto h-7 rounded-md" />
        </div>
        <div className="col-span-3 gap-1  flex justify-center items-center text-sm">
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
        </div>
        <div className="col-span-2 flex items-center justify-center gap-1">
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
          <LoadingSkeleton className="w-7 h-7 rounded-md" />
        </div>
      </div>
    </div>
  );
};
export default memo(HomeRankingItemSkeleton);
