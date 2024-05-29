import { memo } from "react";
import { BsArrowLeft } from "react-icons/bs";

import { LoadingSkeleton } from "@components/Loading";

interface LayoutContentWrapperTitleProps {
  title?: string;
  subtitle?: string;
  onClickBack?: () => void;
}

const LayoutContentWrapperTitle = ({ title, subtitle, onClickBack }: LayoutContentWrapperTitleProps) => {
  return (
    <div className="group">
      {subtitle && (
        <div
          className="-ml-1 mt-1 flex cursor-pointer items-center space-x-1 duration-100 group-hover:text-primary-700 hover:underline hover:underline-offset-4"
          role="button"
          tabIndex={0}
          onClick={onClickBack}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full duration-100">
            <BsArrowLeft size={14} />
          </div>
          <span className="text-sm font-normal">{subtitle}</span>
        </div>
      )}
      {title && <div className="mt-0.5">{title}</div>}
      {!title && <LoadingSkeleton className="mb-1 mt-2.5 h-4 w-48 rounded" />}
    </div>
  );
};

export default memo(LayoutContentWrapperTitle);
