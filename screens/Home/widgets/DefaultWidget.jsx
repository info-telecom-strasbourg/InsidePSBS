import React from "react";
import { Text } from "react-native";

import Widget from "./Widget";
import widgetStyle from "./widget.style";
import { useTheme } from "../../../contexts/themeContext";

const DefaultWidget = ({
  backgroundColor,
  foregroundColor,
  width,
  height,
  onPress,
  text,
  icon,
  style,
}) => {
  const { theme } = useTheme();
  const styles = widgetStyle({ color: foregroundColor, backgroundColor });
  return (
    <Widget
      width={width}
      height={height}
      backgroundColor={theme.box}
      onPress={onPress}
      style={styles.defaultWidget}
    >
      {icon}
      <Text style={{ ...styles.widgetTitle, ...style }}>{text}</Text>
    </Widget>
  );
};

export default DefaultWidget;
