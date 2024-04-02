import {
  QueryKey,
  useInfiniteQuery as useBaseInfinityQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const useInfinityQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
) => {
  const infinityQueryObject = useBaseInfinityQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    ...options,
  });

  return infinityQueryObject;
};

export default useInfinityQuery;
