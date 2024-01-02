import { Body1 } from "components/Text";
import { View } from "react-native";

import Widget, { WidgetProps } from "./Widget";
import { ErrorIcon } from "../../../assets/icons";
import { useTheme } from "../../../contexts/themeContext";

const ErrorWidget = ({ width, height, onPress }: WidgetProps) => {
  const { theme } = useTheme();
  return (
    <Widget
      width={width}
      height={height}
      backgroundColor={theme.box}
      onPress={onPress}
      style={{ flexDirection: "row" }}>
      <ErrorIcon width={32} height={32} color={theme.text} />
      <View style={{ width: 10 }} />
      <Body1>Erreur</Body1>
    </Widget>
  );
};

export default ErrorWidget;
