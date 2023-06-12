import React from "react";
import { TouchableOpacity } from "react-native";

import widgetStyles from "./widget.style";

const Widget = ({
  children,
  backgroundColor,
  width,
  height,
  onPress,
  style,
}) => {
  const styles = widgetStyles({
    backgroundColor,
    width: width || 0,
    height: height || 0,
  });
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...styles.widgetContainer,
        ...style,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Widget;
