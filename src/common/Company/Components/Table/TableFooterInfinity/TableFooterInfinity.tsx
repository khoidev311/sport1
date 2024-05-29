import { ForwardedRef, forwardRef, memo, useCallback } from "react";

import { EndScrollDetector, EndScrollDetectorRefType } from "@components/Detector";

import { TableFooterInfinityProps } from "../interface";

const TableFooterInfinity = (
  {
    as,
    children,
    isShown,
    isTriggerEarly,
    pageIndex,
    tableBodyRef,
    onChangePageIndex,
  }: TableFooterInfinityProps,
  ref: ForwardedRef<EndScrollDetectorRefType>,
) => {
  const handleReachEnd = useCallback(() => {
    onChangePageIndex(pageIndex + 1);
  }, [onChangePageIndex, pageIndex]);

  return (
    <EndScrollDetector
      as={as}
      isShown={isShown}
      isTriggerEarly={isTriggerEarly}
      contentContainerRef={tableBodyRef}
      onReach={handleReachEnd}
      ref={ref}
    >
      {children}
    </EndScrollDetector>
  );
};

export default memo(forwardRef(TableFooterInfinity));
