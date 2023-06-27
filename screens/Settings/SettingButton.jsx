import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { ChevronRightIcon } from "../../assets/icons";

const SettingButton = ({ onPress, rightIcon, leftIcon, text, style }) => {
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
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        {leftIcon}
        <Text style={text_styles.body2(theme)}>{text}</Text>
      </View>
      {rightIcon || (
        <ChevronRightIcon color={theme.text} height={14} width={16} />
      )}
    </TouchableOpacity>
  );
};

export default SettingButton;
