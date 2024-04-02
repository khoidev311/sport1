import { isEmpty, isEqual } from "lodash";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

import { BaseListQueryType } from "@interfaces/Common";

type UseQueryParamResultType = [
  BaseListQueryType | null,
  Dispatch<SetStateAction<BaseListQueryType>>,
  VoidFunction,
];

/**
 * Use to save and update query param. Work with `Table` component only.
 */
const useTableQuery = (defaultQueryParam?: BaseListQueryType): UseQueryParamResultType => {
  const [queryParam, setQueryParam] = useState<BaseListQueryType | null>(null);

  const handleChange: Dispatch<SetStateAction<BaseListQueryType>> = useCallback(
    (data) =>
      setQueryParam((prev) => {
        const newData = { ...prev, ...(typeof data === "function" ? data(prev as BaseListQueryType) : data) };

        if (isEqual(prev, newData)) {
          return prev;
        }

        return newData;
      }),
    [],
  );

  const increasePageIndex = useCallback(() => {
    handleChange((prev) => ({
      ...prev,
      pageIndex: (prev.pageIndex ?? 0) + 1,
    }));
  }, [handleChange]);

  useEffect(() => {
    if (isEmpty(defaultQueryParam)) {
      return;
    }

    setQueryParam(defaultQueryParam);
  }, [defaultQueryParam]);

  return [queryParam, handleChange, increasePageIndex];
};

export default useTableQuery;
