import COLORS from "constants/colors";
import { PropsWithChildren } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

export type WidgetProps = PropsWithChildren<{
  backgroundColor?: string;
  width?: number;
  height?: number;
  onPress: () => void;
  style?: ViewStyle;
}>;

const Widget = ({
  children,
  backgroundColor = COLORS.primary,
  width = 0,
  height = 0,
  onPress,
  style,
}: WidgetProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor,
        width,
        height,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        ...style,
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Widget;
