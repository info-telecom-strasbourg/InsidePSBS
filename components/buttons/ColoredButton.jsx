import React from "react";
import { Text, TouchableOpacity } from "react-native";
import buttonStyles from "./button.style";
import { COLORS } from "../../constants";

const ColoredButton = ({ text, backgroundColor, color, onClick }) => {
  const styles = buttonStyles({ backgroundColor, color });
  return (
    <TouchableOpacity style={styles.btnContainer} onClick={onClick}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ColoredButton;
