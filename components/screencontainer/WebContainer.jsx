import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { View } from "react-native";
import screenStyles from "./screencontainer.style";

const WebContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = screenStyles(theme);

  if (Platform.OS !== "web") return <View style={{ flex: 1 }}>{children}</View>;
  return (
    <View style={styles.webContainer}>
      <View style={{ flex: 1, maxWidth: 400 }}>{children}</View>
    </View>
  );
};

export default WebContainer;
