import { useTheme } from "../../contexts/themeContext";
import { View } from "react-native";
import React from "react";
import styles from "./screencontainer.style";

const ScreenContainer = ({ children }) => {
  const { theme } = useTheme();
  return <View style={styles.screenContainer(theme)}>{children}</View>;
};

export default ScreenContainer;
