import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./button.style";

const ColoredButton = ({ text, backgroundColor, color, onClick }) => {
  return (
    <TouchableOpacity
      style={{ ...styles().btnContainer, backgroundColor }}
      onClick={onClick}
    >
      <Text style={{ ...styles().btnText, color }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ColoredButton;
