import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { StyleSheet, Text, View } from "react-native";

const Badge = ({
  text,
  background = COLORS.primary,
  foreground = COLORS.white,
  size = 15,
}: {
  text: string;
  background: string;
  foreground: string;
  size: number;
}) => {
  const styles = StyleSheet.create({
    badgeContainer: {
      backgroundColor: background,
      borderRadius: size,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeText: {
      color: foreground,
      fontSize: 0.6 * size,
      lineHeight: size,
      fontFamily: FONTS.OpenSans.bold,
    },
  });

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

export default Badge;
