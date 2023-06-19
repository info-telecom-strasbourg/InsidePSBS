import React from "react";
import { Text, TextInput as Entry, View } from "react-native";
import styles from "./input.style";

const TextInput = ({ label, onChangeText, value }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.textInputLabel({})}>{label}</Text>
      <View style={{ height: 5 }} />
      <Entry
        style={styles.textInputEntry({})}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextInput;
