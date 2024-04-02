import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const HomeSliderScoreItemSkeleton = () => {
  return (
    <div className="w-72 h-36 border grid grid-cols-3 bg-white rounded-lg">
      <div className="col-span-2 px-6 py-4 flex items-center justify-center flex-wrap">
        <LoadingSkeleton className="w-full h-6 rounded-full" />
        <LoadingSkeleton className="w-full h-6 rounded-full" />
      </div>
      <div className="col-span-1 flex items-center justify-center ">
        <LoadingSkeleton className="w-10 h-6 rounded-full" />
      </div>
    </div>
  );
};
export default memo(HomeSliderScoreItemSkeleton);
