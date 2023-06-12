import React from "react";
import { Text, TextInput as Entry, View } from "react-native";
import inputStyles from "./input.style";

const TextInput = ({ label, onChangeText, value, color, background }) => {
  const styles = inputStyles({ color, background });
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <View style={{ height: 5 }} />
      <Entry
        style={styles.textInputEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextInput;
