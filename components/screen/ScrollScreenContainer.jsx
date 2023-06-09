import { useTheme } from "../../contexts/themeContext";
import { ScrollView } from "react-native";
import React from "react";
import styles from "./screencontainer.style";

const ScrollScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ScrollView style={styles.screenContainer(theme)}>{children}</ScrollView>
  );
};

export default ScrollScreenContainer;
