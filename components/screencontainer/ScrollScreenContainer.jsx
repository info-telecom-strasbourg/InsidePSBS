import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const ScrollScreenContainer = ({ children, refreshControl }) => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.screenContainer(theme)}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenContainer;
