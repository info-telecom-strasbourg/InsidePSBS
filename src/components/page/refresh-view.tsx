import type { PropsWithChildren } from "react";
import type { ScrollViewProps } from "react-native";
import { RefreshControl, ScrollView } from "react-native";

export type RefreshViewProps = PropsWithChildren<
  {
    isRefreshing: boolean;
    handleRefresh: () => Promise<void>;
  } & ScrollViewProps
>;

export const RefreshView = ({
  children,
  isRefreshing,
  handleRefresh,
  className,
  ...props
}: RefreshViewProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      className={className}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
