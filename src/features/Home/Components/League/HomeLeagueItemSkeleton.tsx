import { memo } from "react";

import { LoadingSkeleton } from "@components/Loading";

const HomeLeagueItemSkeleton = () => {
  return (
    <div className="flex w-full h-10 px-4 items-center gap-x-4">
      <LoadingSkeleton className="w-6 h-6 rounded-full" />
      <LoadingSkeleton className="flex-auto h-6 rounded-full" />
    </div>
  );
};
export default memo(HomeLeagueItemSkeleton);
