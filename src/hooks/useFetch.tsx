import { useState } from "react";
import useSWR from "swr";

export type Fetcher<T> = (url: string) => Promise<T>;

export const useFetch = <T,>(url: string, fetcher: Fetcher<T>) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    url,
    fetcher,
    { revalidateOnFocus: true, revalidateIfStale: false }
  );
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
  };
};
