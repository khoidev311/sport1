import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { HOME_PATH } from "@constants/routeConstant";

import FooterLinkItem from "../../Footer/LinkItem";

interface SidebarLinkProps {
  className?: string;
}

const SidebarLink = ({ className }: SidebarLinkProps) => {
  const { t } = useTranslation();

  const handlePreventEvent = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlePreventEvent}
      className={twMerge("h-fit w-full border-t px-2 xs:block md:hidden", className)}
    >
      <FooterLinkItem
        to={HOME_PATH.HOME}
        isShowArrow={false}
        className="mb-0.5 rounded-md font-semibold p-2 hover:bg-gray-200 hover:text-primary-600"
      >
        {t("home")}
      </FooterLinkItem>
      <FooterLinkItem
        to={HOME_PATH.NEWS}
        isShowArrow={false}
        className="mb-0.5 rounded-md font-semibold p-2 hover:bg-gray-200 hover:text-primary-600"
      >
        {t("news")}
      </FooterLinkItem>
      <FooterLinkItem
        to={HOME_PATH.HIGHTLIGHT}
        isShowArrow={false}
        className="mb-0.5 rounded-md font-semibold p-2 hover:bg-gray-200 hover:text-primary-600"
      >
        {t("highlight")}
      </FooterLinkItem>
      <FooterLinkItem
        to={HOME_PATH.CLUB}
        isShowArrow={false}
        className="mb-0.5 rounded-md font-semibold p-2 hover:bg-gray-200 hover:text-primary-600"
      >
        {t("club")}
      </FooterLinkItem>
    </div>
  );
};
export default memo(SidebarLink);
