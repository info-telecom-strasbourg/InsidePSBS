import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./widget.style";

const Widget = ({ children, color, width, height, onPress, style }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.widgetContainer(color, width || 0, height || 0),
        ...style,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Widget;
