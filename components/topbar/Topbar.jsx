import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../styles";
import topbarStyles from "./topbar.style";
import TouchableSettingsIcon from "../touchableicon/TouchableSettingsIcon";

const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
}) => {
  const styles = topbarStyles();
  const text_styles = textStyles();

  return (
    <View style={styles.topbarContainer}>
      <View style={styles.topbarTitleWrapper}>
        <View style={styles.topbarWrapper}>{leftIcon}</View>
        <View style={{ width: 15 }} />
        <View style={styles.topbarWrapper}>
          <Text
            style={{
              ...text_styles.title1,
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
