import { Body2 } from "components/Text";
import React from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { ChevronRightIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";

const SettingButton = ({
  onPress,
  rightIcon,
  leftIcon,
  text,
  style,
}: {
  onPress: (event: GestureResponderEvent) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  text: string;
  style?: ViewStyle;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.box,
        borderBottomColor: theme.background,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
        ...style,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}>
        {leftIcon}
        <Body2>{text}</Body2>
      </View>
      {rightIcon || (
        <ChevronRightIcon color={theme.text} height={14} width={16} />
      )}
    </TouchableOpacity>
  );
};

export default SettingButton;
