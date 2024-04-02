import { memo } from "react";

import LoadingPageGrid from "./LoadingPageGrid";
import LoadingPageList from "./LoadingPageList";
import LoadingSkeleton from "./LoadingSkeleton";

interface LoadingPageProps {
  isGrid?: boolean;
}

const LoadingPage = ({ isGrid }: LoadingPageProps) => {
  return (
    <div className="mb-4 block w-full px-4 xs:px-4 sm:px-4 md:px-8 lg:mb-8 lg:px-8">
      <div className="min-h-22 flex items-center justify-between py-6">
        <LoadingSkeleton className="h-4 w-56 rounded" />
      </div>
      <div className="rounded-lg border-gray-100 shadow-gray-50 lg:border-2 lg:p-6 lg:shadow">
        <div className="flex items-center space-x-4">
          <LoadingSkeleton className="h-10 w-72 rounded-lg" />
          <LoadingSkeleton className="h-10 w-40 rounded-lg" />
          <LoadingSkeleton className="h-10 w-40 rounded-lg" />
        </div>
        {isGrid && <LoadingPageGrid className="mt-4 lg:mt-6" />}
        {!isGrid && <LoadingPageList className="mt-6" />}
      </div>
    </div>
  );
};

export default memo(LoadingPage);
