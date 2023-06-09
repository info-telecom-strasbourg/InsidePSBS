import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../styles";
import { useTheme } from "../../contexts/themeContext";
import styles from "./topbar.style";
import { TouchableSettingsIcon } from "../index";

const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.topbarContainer}>
      <View style={styles.topbarTitleWrapper}>
        <View style={styles.topbarWrapper}>{leftIcon}</View>
        <View style={{ width: 15 }} />
        <View style={styles.topbarWrapper}>
          <Text
            style={{
              ...textStyles.title1(theme),
            }}
          >
            {children}
          </Text>
        </View>
      </View>
      <View style={styles.topbarWrapper}>{rightIcon}</View>
    </View>
  );
};

export default Topbar;
