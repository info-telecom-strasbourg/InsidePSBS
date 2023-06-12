import React from "react";
import { Text, View } from "react-native";
import badgeStyles from "./badge.style";
import { COLORS } from "../../constants";

const Badge = ({ text, color, backgroundColor, width }) => {
  const styles = badgeStyles({ color, backgroundColor, width });
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

export default Badge;
