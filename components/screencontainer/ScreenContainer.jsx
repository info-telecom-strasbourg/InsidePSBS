import React from "react";
import { View } from "react-native";

import styles from "./screencontainer.style";
import { useTheme } from "../../contexts";

const ScreenContainer = ({ children }) => {
  const { theme } = useTheme();

  return <View style={styles.screenContainer(theme)}>{children}</View>;
};

export default ScreenContainer;
