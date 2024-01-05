import { useTheme } from "contexts/themeContext";
import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
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

export const KeyboardAvoidingContainer = ({
  children,
  style,
}: PropsWithChildren<{ style: StyleProp<ViewStyle> }>) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 70}>
      <ScrollView>
        <View style={style}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
