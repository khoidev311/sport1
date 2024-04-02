import { memo } from "react";

import { LoadingSkeleton } from "../Loading";

interface TableImageColumnProps {
  alt?: string;
  skeleton?: boolean;
  src?: string | null;
}

const TableImageColumn = ({ alt, skeleton = false, src }: TableImageColumnProps) => {
  return (
    <div className="h-12 w-12 rounded-full bg-gray-100">
      {(skeleton || !src) && <LoadingSkeleton className="h-full w-full rounded-full" />}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full border-2 border-gray-100 object-cover object-center"
        />
      )}
    </div>
  );
};

export default memo(TableImageColumn);
