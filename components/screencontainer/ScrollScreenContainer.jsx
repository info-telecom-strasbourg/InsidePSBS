import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const ScrollScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.screenContainer(theme)}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenContainer;
