import React from "react";
import { View } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const WebContainer = ({ children }) => {
  const { theme } = useTheme();
  if (Platform.OS !== "web") return <View style={{ flex: 1 }}>{children}</View>;
  return (
    <View style={styles.webContainer(theme)}>
      <View style={{ flex: 1, maxWidth: 400 }}>{children}</View>
    </View>
  );
};

export default WebContainer;
