import React from "react";
import { Text } from "react-native";

import Widget from "./Widget";
import styles from "./widget.style";
import { useTheme } from "../../../contexts";

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
  return (
    <Widget
      width={width}
      height={height}
      backgroundColor={backgroundColor || theme.box}
      onPress={onPress}
      style={styles.defaultWidget}>
      {icon}
      <Text style={{ ...styles.widgetTitle({ foregroundColor }), ...style }}>
        {text}
      </Text>
    </Widget>
  );
};

export default DefaultWidget;
