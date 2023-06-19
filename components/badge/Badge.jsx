import React from "react";
import { Text, View } from "react-native";
import styles from "./badge.style";

const Badge = ({ text, backgroundColor, color, size }) => {
  return (
    <View style={styles.badgeContainer({ size, backgroundColor })}>
      <Text style={styles.badgeText({ size, color })}>{text}</Text>
    </View>
  );
};

export default Badge;
