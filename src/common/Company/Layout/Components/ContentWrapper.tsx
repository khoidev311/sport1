import { Children, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import useDocumentTitle from "@hooks/useDocumentTitle";

import { LayoutContentWrapperProps } from "../interface";
import LayoutContentWrapperBody from "./ContentWarpperBody";
import LayoutContentWrapperHeader from "./ContentWrapperHeader";
import LayoutContentWrapperTab from "./ContentWrapperTab";

const LayoutContentWrapper = ({
  action,
  activatedTab,
  activeTabItemClassName,
  className,
  bodyClassName,
  children,
  isBlank,
  isBorder,
  isShowHeader = true,
  tabClassName,
  tabItemClassName,
  tabHeader,
  tabs,
  tabStyle,
  title,
  tabAction,
  onChangeTab,
}: LayoutContentWrapperProps) => {
  const activatedTabIndex = useMemo(
    () => tabs?.findIndex((tab) => tab.id === activatedTab) ?? 0,
    [tabs, activatedTab],
  );

  const childTabElement = useMemo(
    () => Children.toArray(children)[activatedTabIndex] ?? null,
    [children, activatedTabIndex],
  );

  useDocumentTitle(title, isShowHeader);

  return (
    <div className={twMerge("mb-4 w-full px-4 sm:px-4 md:px-8 lg:mb-0", className)}>
      {(title || action) && isShowHeader && <LayoutContentWrapperHeader title={title} action={action} />}
      <div className="relative">
        {tabs && (
          <LayoutContentWrapperTab
            activatedTab={activatedTab}
            activeTabItemClassName={activeTabItemClassName}
            className={tabClassName}
            itemClassName={tabItemClassName}
            tabStyle={tabStyle}
            tabs={tabs}
            onChange={onChangeTab}
          />
        )}

        {tabAction}
      </div>
      <LayoutContentWrapperBody
        className={bodyClassName}
        isBlank={isBlank}
        isBorder={isBorder}
        isTab={Boolean(tabs?.length)}
      >
        <div>
          {tabHeader}
          {!tabs?.length || !childTabElement ? children : childTabElement}
        </div>
      </LayoutContentWrapperBody>
    </div>
  );
};

export default memo(LayoutContentWrapper);
