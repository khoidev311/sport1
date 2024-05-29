import { includes } from "lodash";
import { Children, cloneElement, ReactElement, useCallback, useLayoutEffect, useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { layoutSidebarIsCollapsedSelector, layoutSidebarTypeSelector } from "@selectors/commonSelector";
import useSelector from "@hooks/useSelector";

export interface LayoutSidebarGroupProps {
  children: ReactElement | ReactElement[];
  className?: string;
  icon: ReactElement;
  id: string;
  sidebarId?: string;
  isOpen?: boolean;
  title: string;
  onOpen?: (id: string, isChildSelected: boolean) => void;
}

const LayoutSidebarGroup = ({
  className,
  children,
  icon,
  id,
  sidebarId,
  isOpen = false,
  title,
  onOpen,
}: LayoutSidebarGroupProps) => {
  const isCollapsed = useSelector(layoutSidebarIsCollapsedSelector(sidebarId as string));
  const { isGitlab } = useSelector(layoutSidebarTypeSelector(sidebarId as string));

  const forceIsOpen = useMemo(() => {
    if (isGitlab && isCollapsed) {
      return false;
    }

    return isOpen;
  }, [isCollapsed, isOpen, isGitlab]);

  const childrenPath = useMemo(() => {
    const newChildren = Array.isArray(children) ? children : [children];

    return newChildren?.map((item) => {
      if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
        return item;
      }

      if (item && "props" in item && "to" in item.props) {
        return item.props.to;
      }

      return item;
    });
  }, [children]);

  const location = useLocation();

  const isIncludeChildrenPath = useMemo(
    () => includes(childrenPath, location.pathname),
    [childrenPath, location.pathname],
  );

  const handleOpenSidebarGroup = useCallback(
    (_: unknown, isChildSelected = false) => {
      onOpen?.(id, isChildSelected);
    },
    [id, onOpen],
  );

  useLayoutEffect(() => {
    if (isIncludeChildrenPath) {
      handleOpenSidebarGroup(null, true);
    }
  }, [isIncludeChildrenPath, handleOpenSidebarGroup]);

  return (
    <div
      className={twMerge(
        "group/group-label relative z-10 h-fit w-full pb-2 pt-3",
        forceIsOpen && "pb-0",
        isCollapsed &&
          isGitlab &&
          "flex aspect-square cursor-pointer items-center justify-center rounded-md p-0 hover:bg-gray-200",
        isIncludeChildrenPath && isCollapsed && isGitlab && "bg-gray-200",
      )}
    >
      <div
        className={twMerge(
          "flex h-4 w-full items-center text-xs font-semibold text-gray-500 hover:text-primary-600",
          forceIsOpen && "mb-4",
          className,
          isCollapsed && isGitlab && "flex items-center justify-center",
          isCollapsed && isGitlab && isIncludeChildrenPath && "text-primary-600",
        )}
        role="button"
        tabIndex={0}
        onClick={handleOpenSidebarGroup}
      >
        {!(isCollapsed && isGitlab) && (
          <>
            <div>
              <BiChevronRight
                className={twMerge("-ml-0.5 mr-[3px] text-sm duration-200", forceIsOpen && "rotate-90")}
              />
            </div>
            <div className="ml-2 line-clamp-1 break-all uppercase">{title}</div>
          </>
        )}
        {isCollapsed &&
          isGitlab &&
          cloneElement(icon, { size: 20, className: "group-hover/group-label:text-primary-600" })}
      </div>
      {forceIsOpen &&
        Children.map(children, (child: ReactElement) => cloneElement(child, { sidebarId, ...child?.props }))}
      {isCollapsed && isGitlab && (
        <div className="absolute left-14 top-0 hidden group-hover/group-label:block">
          <div className="absolute -left-6 h-16 w-6 bg-transparent" />
          <div className="h-fit w-fit overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-50 shadow">
            <div className="whitespace-nowrap bg-gray-100 px-6 py-2 text-sm font-semibold">{title}</div>
            <div className="px-2 py-2">
              {Children.map(children, (child: ReactElement) =>
                cloneElement(child, {
                  ...child?.props,
                  isChild: true,
                  sidebarId,
                }),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSidebarGroup;
