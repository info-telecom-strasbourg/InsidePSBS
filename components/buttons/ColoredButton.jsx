import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./button.style";

const ColoredButton = ({
  text,
  background,
  foreground,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btnContainer({ background }), ...style }}
      onPress={onPress}
    >
      <Text style={{ ...styles.btnText({ text: foreground }), ...textStyle }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ColoredButton;
