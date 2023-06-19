import React from "react";
import { Text, View } from "react-native";
import styles from "./badge.style";

const Badge = ({ text, style, size }) => {
  return (
    <View
      style={{
        ...styles(size).badgeContainer,
        backgroundColor: style.backgroundColor,
      }}
    >
      <Text style={{ ...styles(size).badgeText, color: style.color }}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
