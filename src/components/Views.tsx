import { useTheme } from "@/contexts/ThemeContext";
import { useState, type PropsWithChildren } from "react";
import type { ScrollViewProps, ViewProps } from "react-native";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ScreenView = ({
  children,
  style,
  ...props
}: PropsWithChildren<ViewProps>) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </View>
  );
};

export const ScrollScreenView = ({
  children,
  style,
  onRefresh,
  ...props
}: PropsWithChildren<
  ScrollViewProps & { onRefresh?: () => Promise<void> }
>) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    await onRefresh();
    setLoading(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh ? handleRefresh : null}
          refreshing={loading}
        />
      }
      style={{
        flex: 1,
        backgroundColor: theme.background,
        ...(typeof style === "object" && style),
      }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
