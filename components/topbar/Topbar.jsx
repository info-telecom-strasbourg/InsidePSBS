import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./topbar.style";
import TouchableSettingsIcon from "../touchableicon/TouchableSettingsIcon";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";

const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
  onPress,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.topbarContainer()}>
      <TouchableOpacity
        style={styles.topbarTitleWrapper()}
        activeOpacity={1}
        onPress={onPress}
      >
        <View style={styles.topbarWrapper()}>{leftIcon}</View>
        <View style={{ width: 15 }} />
        <View style={styles.topbarWrapper()}>
          <Text style={text_styles.title1(theme)}>{children}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.topbarWrapper()}>{rightIcon}</View>
    </View>
  );
};

export default Topbar;
