import React from "react";
import { Text, TextInput as Entry, View } from "react-native";

import styles from "./input.style";
import { useTheme } from "../../contexts";

const TextInput = ({ label, onChangeText, value }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 5 }} />
      <Entry
        style={styles.textInputEntry(theme)}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextInput;
