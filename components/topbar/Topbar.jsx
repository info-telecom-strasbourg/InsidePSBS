import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../styles";
<<<<<<< HEAD
import topbarStyles from "./topbar.style";
import TouchableSettingsIcon from "../touchableicon/TouchableSettingsIcon";
=======
import { useTheme } from "../../contexts/themeContext";
import styles from "./topbar.style";
import { TouchableSettingsIcon } from "../index";
>>>>>>> parent of b866aa0 (refactoring)

const Topbar = ({
  children,
  leftIcon,
  rightIcon = <TouchableSettingsIcon />,
}) => {
<<<<<<< HEAD
  const styles = topbarStyles();
  const text_styles = textStyles();

=======
  const { theme } = useTheme();
>>>>>>> parent of b866aa0 (refactoring)
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
