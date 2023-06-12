import { useTheme } from "../../contexts/themeContext";
import { ScrollView } from "react-native";
import React from "react";
import screenStyles from "./screencontainer.style";

const ScrollScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  const styles = screenStyles(theme);

  return <ScrollView style={styles.screenContainer}>{children}</ScrollView>;
};

export default ScrollScreenContainer;
