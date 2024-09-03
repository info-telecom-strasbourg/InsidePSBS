import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";

export const useRefresh = (handleRefresh: () => Promise<void>) => {
  const { refresh } = useLocalSearchParams<{
    refresh: string;
  }>();
  const router = useRouter();

  useFocusEffect(() => {
    if (refresh === "true") {
      handleRefresh();
      router.setParams({ refresh: undefined });
    }
  });
};
