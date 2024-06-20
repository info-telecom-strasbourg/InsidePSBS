import { cn } from "@/utils/cn";
import type { PropsWithChildren } from "react";
import { SafeAreaView, View, type ViewProps } from "react-native";

export type PageContainerProps = PropsWithChildren<{} & ViewProps>;

export const PageContainer = ({
  children,
  className,
  ...props
}: PageContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={cn("flex-1 px-3 pt-16", className)} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};
