import React from "react";
import { ScrollView } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const ScrollScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ScrollView style={styles.screenContainer(theme)}>{children}</ScrollView>
  );
};

export default ScrollScreenContainer;
