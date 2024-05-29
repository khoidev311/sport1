import { InfiniteData, QueryKey, UseInfiniteQueryOptions, useQueryClient } from "@tanstack/react-query";
import { clone, get, isEmpty, omit } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ArrayElement, BaseListQueryType, ResponseDataType } from "@interfaces/Common";

import useInfinityQuery from "./useInfinityQuery";
import useTableQuery from "./useTableQuery";
import useToast from "./useToast";

interface UseTableInfinityQueryProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, "queryFn"> {
  isEnableDefaultSort?: boolean;
  queryFnOptions?: BaseListQueryType;
  tableQuery?: BaseListQueryType | null;
  onChangeTableQuery?: (query: BaseListQueryType) => void;
  queryFn: (param: BaseListQueryType) => TQueryFnData | Promise<TQueryFnData>;
}

type UpdateQueryDataTransformType<TQueryFnData extends ResponseDataType<unknown[]>> =
  | ((item: ArrayElement<TQueryFnData["data"]>) => ArrayElement<TQueryFnData["data"]>)
  | Partial<ArrayElement<TQueryFnData["data"]>>;

const useTableInfinityQuery = <
  TQueryFnData extends ResponseDataType<unknown[]>,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  baseQueryKey: TQueryKey,
  {
    isEnableDefaultSort = true,
    tableQuery: controlledTableQuery,
    queryFnOptions,
    queryFn,
    onChangeTableQuery,
    ...options
  }: UseTableInfinityQueryProps<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const toast = useToast();
  const { t } = useTranslation();

  const [selfTableQuery, setSelfTableQuery] = useTableQuery();
  const [isHardRefetching, setIsHardRefetching] = useState(false);

  const tableQuery = useMemo(
    () => controlledTableQuery ?? selfTableQuery,
    [controlledTableQuery, selfTableQuery],
  );

  const queryClient = useQueryClient();
  const isEnable = useMemo(() => get(options, "enabled", !isEmpty(tableQuery)), [options, tableQuery]);
  const queryKey = useMemo(
    () => [...baseQueryKey, omit(selfTableQuery, "pageIndex", "loadingType")] as unknown as TQueryKey,
    [baseQueryKey, selfTableQuery],
  );

  const {
    error,
    data: baseData,
    isFetching: baseIsFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    ...useInfinityQueryResultObject
  } = useInfinityQuery(queryKey, {
    queryFn: ({ pageParam }) => {
      const defaultSortParams = queryFnOptions?.sortParams;
      const tableSortParams = tableQuery?.sortParams;

      const sortParams = tableSortParams?.length ? tableSortParams : defaultSortParams;

      return queryFn({
        ...queryFnOptions,
        ...tableQuery,
        pageIndex: pageParam,
        sortParams: isEnableDefaultSort ? sortParams : undefined,
        isEnableDefaultSort,
      });
    },
    enabled: isEnable,
    getNextPageParam: (lastPage) => get(lastPage, "meta.has_next") && get(lastPage, "meta.page"),
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });

  const isFetching = useMemo(() => {
    if (!isEnable) {
      return true;
    }

    return baseIsFetching;
  }, [baseIsFetching, isEnable]);
  const data = useMemo(() => {
    if (isEnable) {
      return baseData;
    }

    return queryClient.getQueryData(baseQueryKey) as typeof baseData;
  }, [baseData, baseQueryKey, isEnable, queryClient]);

  const handleChangeTableQuery = useCallback(
    (newQuery: BaseListQueryType) => {
      setSelfTableQuery(newQuery);
      if (newQuery.pageIndex && hasNextPage) {
        fetchNextPage();
      }
    },
    [setSelfTableQuery, hasNextPage, fetchNextPage],
  );

  const hardRefetch = useCallback(async () => {
    setIsHardRefetching(true);
    await refetch();
    setIsHardRefetching(false);
  }, [refetch]);

  /**
   * Updates the query data for a specific key in an infinite query result.
   * If the `transform` function is not provided, the item will be removed from the list.
   * @param key The key of the item to update.
   * @param transform An optional function to transform the updated item.
   */
  const updateQueryData = useCallback(
    (key: Key, transform?: UpdateQueryDataTransformType<TQueryFnData>) => {
      queryClient.setQueryData<InfiniteData<ResponseDataType<TQueryFnData["data"]>> | undefined>(
        queryKey,
        (old) => {
          if (!old) {
            return old;
          }

          const newData = clone(old);

          newData.pages = newData.pages.map((page) => {
            const newPage = clone(page);

            newPage.data = page.data
              .map((item) => {
                const id = get(item, "id");

                if (!id || id !== key) {
                  return item;
                }

                // If not `transform` function, return `null` to remove item from list.
                if (!transform) {
                  return null;
                }

                if (typeof transform === "function") {
                  return transform(item as ArrayElement<TQueryFnData["data"]>);
                }

                if (typeof transform === "object" && typeof item === "object") {
                  return {
                    ...item,
                    ...(transform as Partial<ArrayElement<TQueryFnData["data"]>>),
                  };
                }

                return transform;
              })
              .filter(Boolean);

            return newPage;
          });

          return newData;
        },
      );
    },
    [queryClient, queryKey],
  );

  const handleError = useCallback(() => {
    if (!error) {
      return;
    }

    toast.error(t("performingRequestError"));
  }, [error, toast, t]);

  useEffect(() => {
    if (!baseQueryKey) {
      return;
    }

    queryClient.setQueryData(baseQueryKey, baseData);
  }, [baseQueryKey, baseData, queryClient]);

  useEffect(() => {
    handleError();
  }, [handleError]);

  return {
    ...useInfinityQueryResultObject,
    data,
    isFetching,
    isHardRefetching,
    hasNextPage,
    fetchNextPage,
    handleChangeTableQuery: onChangeTableQuery ?? handleChangeTableQuery,
    hardRefetch,
    refetch,
    updateQueryData,
  };
};

export default useTableInfinityQuery;
