import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const HomeFixtureItemSkeleton = () => {
  return (
    <div className="flex first:mt-4 last:mb-4 w-full h-fit px-10 py-4 items-center gap-x-8">
      <LoadingSkeleton className="w-20 h-8 rounded-full" />
      <LoadingSkeleton className="flex-auto h-8 rounded-full" />
    </div>
  );
};
export default memo(HomeFixtureItemSkeleton);
