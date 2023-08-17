import React from "react";
import { Text, TextInput as Entry, View } from "react-native";

import styles from "./input.style";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { COLORS } from "../../constants";

const TextInput = ({
  label,
  onChangeText,
  value,
  error,
  placeholder,
  autoComplete,
  secureTextEntry,
  inputMode,
  autoCapitalize,
  autoCorrect,
}) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 10 }} />
      <Entry
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        autoComplete={autoComplete}
        style={styles.textInputEntry(theme)}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.text_secondary}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
      {error && (
        <>
          <View style={{ height: 5 }} />
          <Text style={text_styles.body3({ text: COLORS.dark_red })}>
            {error}
          </Text>
        </>
      )}
    </View>
  );
};

export default TextInput;
