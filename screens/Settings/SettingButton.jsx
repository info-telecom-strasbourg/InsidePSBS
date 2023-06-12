import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import settingStyles from "./settings.style";
import { ChevronRightIcon } from "../../assets/icons";
import { COLORS } from "../../constants";

const SettingButton = ({
  onPress,
  leftIcon,
  rightIcon = <ChevronRightIcon color={COLORS.white} width={15} height={15} />,
  text,
}) => {
  const styles = settingStyles();
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonWrapper}>
        {leftIcon}
        <View style={{ width: 15 }} />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

export default SettingButton;
