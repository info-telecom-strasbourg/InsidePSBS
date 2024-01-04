import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { useTheme } from "contexts/themeContext";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { env } from "utils/env";

const Badge = ({
  text,
  style,
  textStyle,
  size = 20,
}: {
  text: string;
  size?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  const styles = StyleSheet.create({
    badgeContainer: {
      backgroundColor: COLORS.primary,
      borderRadius: size,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      ...style,
    },
    badgeText: {
      color: COLORS.white,
      fontSize: 0.6 * size,
      lineHeight: size,
      fontFamily: FONTS.OpenSans.bold,
      ...textStyle,
    },
  });

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

export const DeveloperBadge = () => {
  const { theme } = useTheme();

  if (env.STAGE !== "dev") return;

  return (
    <Badge
      text="D"
      style={{
        backgroundColor: theme.box,
        top: 5,
        position: "absolute",
        right: 10,
        zIndex: 10,
      }}
      textStyle={{ color: theme.text }}
    />
  );
};

export default Badge;
