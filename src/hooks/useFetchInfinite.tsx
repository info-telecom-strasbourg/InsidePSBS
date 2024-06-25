import { useState } from "react";
import useSWRInfinite from "swr/infinite";

export type Fetcher<T> = (url: string) => Promise<T>;
export type GetKey = (pageIndex: number) => string;

export const useFetchInfinite = <T,>(getKey: GetKey, fetcher: Fetcher<T>) => {
  const { data, error, isLoading, mutate, isValidating, size, setSize } =
    useSWRInfinite(getKey, fetcher);
  const [isRefreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await mutate();
    } finally {
      setRefreshing(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
    isRefreshing,
    handleRefresh,
    size,
    setSize,
  };
};
