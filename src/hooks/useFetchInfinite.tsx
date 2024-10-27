import { useState } from "react";
import useSWRInfinite from "swr/infinite";

export type Fetcher<T> = (url: string, token: string) => Promise<T | undefined>;
export type GetKey<T> = (
  pageIndex: number,
  previousPageData: T
) => string | null;

export const useFetchInfinite = <T,>(
  getKey: GetKey<T>,
  fetcher: Fetcher<T>,
  options?: { initialSize?: number }
) => {
  const { data, error, isLoading, mutate, isValidating, size, setSize } =
    useSWRInfinite(getKey, fetcher, { revalidateOnFocus: true, ...options });
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
