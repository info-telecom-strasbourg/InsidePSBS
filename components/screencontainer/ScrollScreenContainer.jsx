import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const ScrollScreenContainer = ({ children, refreshControl, background }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.screenContainer({
          background: background || theme.background,
        })}
        refreshControl={refreshControl}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenContainer;
