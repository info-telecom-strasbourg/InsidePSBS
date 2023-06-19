import React from "react";
import { Text, View } from "react-native";

import styles from "./topbar.style";
import TouchableSettingsIcon from "../touchableicon/TouchableSettingsIcon";
import { text_styles } from "../../styles";

const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
}) => {
  return (
    <View style={styles.topbarContainer()}>
      <View style={styles.topbarTitleWrapper()}>
        <View style={styles.topbarWrapper()}>{leftIcon}</View>
        <View style={{ width: 15 }} />
        <View style={styles.topbarWrapper()}>
          <Text style={text_styles.title1({})}>{children}</Text>
        </View>
      </View>
      <View style={styles.topbarWrapper()}>{rightIcon}</View>
    </View>
  );
};

export default Topbar;
