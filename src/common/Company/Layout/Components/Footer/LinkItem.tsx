import { memo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface FooterLinkItemProps {
  to: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  isShowArrow?: boolean;
}

const FooterLinkItem = ({ to, className, children, isShowArrow = true }: FooterLinkItemProps) => {
  return (
    <Link
      className={twMerge(
        "mb-2 flex cursor-pointer items-center duration-75 hover:text-primary-700",
        className,
      )}
      to={to}
    >
      {isShowArrow && <BiChevronRight className="-ml-1.5 mr-1" />}
      {children}
    </Link>
  );
};

export default memo(FooterLinkItem);
