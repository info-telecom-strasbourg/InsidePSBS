import { useTheme } from "../../contexts/themeContext";
import { View, Platform } from "react-native";
import React from "react";
import screenStyles from "./screencontainer.style";

const ScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = screenStyles(theme);

  return <View style={styles.screenContainer}>{children}</View>;
};

export default ScreenContainer;
