import React from "react";
import { Text, View } from "react-native";
import styles from "./badge.style";
import { COLORS } from "../../constants";

const Badge = ({ text, color, backgroundColor, width }) => {
  return (
    <View style={styles.badgeContainer({ backgroundColor, width })}>
      <Text style={styles.badgeText({ color, width })}>{text}</Text>
    </View>
  );
};

export default Badge;
