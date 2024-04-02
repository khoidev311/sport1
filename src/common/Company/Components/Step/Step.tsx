import { Children, cloneElement, memo, useMemo } from "react";

import { StepProps } from "./interface";

const Step = ({ children, current }: StepProps) => {
  const childrenCount = useMemo(() => Children.count(children), [children]);

  return (
    <div className="flex items-center justify-between bg-white">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          order: index + 1,
          isFirst: index === 0,
          isLast: index === childrenCount - 1,
          isActive: index + 1 === current,
          isFinished: index + 1 < current,
        }),
      )}
    </div>
  );
};

export default memo(Step);
