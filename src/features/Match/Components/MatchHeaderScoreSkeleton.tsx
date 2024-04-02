import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const MatchHeaderScoreSkeleton = () => {
  return (
    <>
      <div className="col-span-3 flex items-center justify-center">
        <LoadingSkeleton className="w-12 h-12 rounded-xl" />
      </div>
      <div className="col-span-2  flex items-center justify-center">
        <div className="text-3xl font-semibold rounded-md">
          <LoadingSkeleton className="w-28 h-10 rounded-xl" />
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-center">
        <LoadingSkeleton className="w-12 h-12 rounded-xl" />
      </div>
    </>
  );
};

export default memo(MatchHeaderScoreSkeleton);
