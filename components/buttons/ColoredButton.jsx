import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./button.style";

const ColoredButton = ({ text, background, foreground, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer({ background })}
      onPress={onPress}
    >
      <Text style={styles.btnText({ text: foreground })}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ColoredButton;
