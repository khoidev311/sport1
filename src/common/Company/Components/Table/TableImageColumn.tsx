import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "../Loading";

interface TableImageColumnProps {
  alt?: string;
  skeleton?: boolean;
  src?: string | null;
  className?: string;
  imageClassName?: string;
}

const TableImageColumn = ({
  alt,
  skeleton = false,
  src,
  className,
  imageClassName,
}: TableImageColumnProps) => {
  return (
    <div
      className={twMerge("h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center", className)}
    >
      {skeleton && <LoadingSkeleton className="h-full w-full rounded-full" />}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "h-full w-full rounded-full border-2 border-gray-100 object-cover object-center",
            imageClassName,
          )}
        />
      )}
      {!skeleton && !src && alt && (
        <span className="text-lg w-fit h-fit font-semibold">{alt?.slice(0, 1)}</span>
      )}
    </div>
  );
};

export default memo(TableImageColumn);
