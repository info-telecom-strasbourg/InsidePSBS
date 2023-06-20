import React from "react";
import Widget from "./Widget";
import { ErrorIcon } from "../../../assets/icons";
import { Text, View } from "react-native";
import { useTheme } from "../../../contexts";
import { text_styles } from "../../../styles";

const ErrorWidget = ({ width, height, onPress, fetch }) => {
  const { theme } = useTheme();
  return (
    <Widget
      width={width}
      height={height}
      backgroundColor={theme.box}
      onPress={onPress}
      style={{ flexDirection: "row" }}
    >
      <ErrorIcon width={32} height={32} color={theme.text} />
      <View style={{ width: 10 }} />
      <Text style={text_styles.body1(theme)}>Erreur</Text>
    </Widget>
  );
};

export default ErrorWidget;
