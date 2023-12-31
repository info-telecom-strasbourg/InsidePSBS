import React from "react";
import { Text, TextInput as Entry, View } from "react-native";

import styles from "./input.style";
import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const TextInput = ({
  multiline,
  numberOfLines,
  style,
  maxLength,
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
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength ? maxLength : 4000000000}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        autoComplete={autoComplete}
        style={[styles.textInputEntry(theme), style]}
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
