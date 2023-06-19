import React from "react";
import { Text, View } from "react-native";

import styles from "./badge.style";

const Badge = ({ text, background, foreground, size }) => {
  return (
    <View style={styles.badgeContainer({ size, background })}>
      <Text style={styles.badgeText({ size, text: foreground })}>{text}</Text>
    </View>
  );
};

export default Badge;
