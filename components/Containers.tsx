import { useTheme } from "contexts/themeContext";
import { PropsWithChildren } from "react";
import { Platform, ScrollView, ScrollViewProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export const ScreenContainer = ({
  children,
  style,
  ...props
}: PropsWithChildren<ViewProps>) => {
  const { theme } = useTheme();

  return (
    <View
      style={[{ flex: 1, backgroundColor: theme.background }, style]}
      {...props}>
      {children}
    </View>
  );
};

export const ScrollScreenContainer = ({
  children,
  style,
  ...props
}: PropsWithChildren<ScrollViewProps>) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[{ flex: 1, backgroundColor: theme.background }, style]}
        {...props}>
        {children}
      </ScrollView>
    </View>
  );
};

export const WebContainer = ({
  children,
  style,
  ...props
}: PropsWithChildren<ViewProps>) => {
  const { theme } = useTheme();
  if (Platform.OS !== "web") return <>{children}</>;
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          width: "100%",
          flexDirection: "row",
          backgroundColor: theme.background,
        },
        style,
      ]}
      {...props}>
      <View style={{ flex: 1, maxWidth: 400, position: "relative" }}>
        {children}
      </View>
    </View>
  );
};
