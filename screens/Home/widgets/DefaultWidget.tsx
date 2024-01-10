import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { Text } from "react-native";

import Widget, { WidgetProps } from "./Widget";
import { useTheme } from "../../../contexts/themeContext";

type DefaultWidgetProps = WidgetProps & {
  text?: string;
  icon?: React.ReactNode;
  foregroundColor?: string;
};

const DefaultWidget = ({
  backgroundColor,
  foregroundColor,
  width,
  height,
  onPress,
  text,
  icon,
  style,
}: DefaultWidgetProps) => {
  const { theme } = useTheme();
  return (
    <Widget
      width={width}
      height={height}
      backgroundColor={backgroundColor || theme.box}
      onPress={onPress}
      style={{ alignItems: "center", justifyContent: "center" }}>
      {icon}
      <Text
        style={{
          color: foregroundColor || COLORS.primary,
          fontFamily: FONTS.OpenSans.bold,
          fontSize: 25,
          ...style,
        }}>
        {text}
      </Text>
    </Widget>
  );
};

export default DefaultWidget;
