import React from "react";
import Widget from "./Widget";
import { Text } from "react-native";
import styles from "./widget.style";

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
  return (
    <Widget
      width={width}
      height={height}
      color={backgroundColor}
      onPress={onPress}
      style={styles.defaultWidget}
    >
      {icon}
      <Text style={{ ...styles.widgetTitle(foregroundColor), ...style }}>
        {text}
      </Text>
    </Widget>
  );
};

export default DefaultWidget;
