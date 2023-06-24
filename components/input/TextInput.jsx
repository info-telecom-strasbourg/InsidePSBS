import React from "react";
import { Text, TextInput as Entry, View } from "react-native";

import styles from "./input.style";
import { useTheme } from "../../contexts";

const TextInput = ({ label, onChangeText, value }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 10 }} />
      <Entry
        style={styles.textInputEntry(theme)}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextInput;
