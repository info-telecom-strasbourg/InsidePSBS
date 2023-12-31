import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "./input.style";
import { EyeClosedIcon, EyeIcon } from "../../assets/icons";
import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const PasswordInput = ({
  label,
  onChangeText,
  value,
  error,
  placeholder,
  autoComplete,
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <View>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 10 }} />
      <View style={{ position: "relative" }}>
        <TextInput
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={autoComplete} // "current-password" | "new-password"
          style={{ ...styles.textInputEntry(theme), paddingRight: 50 }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.text_secondary}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            justifyContent: "center",
            paddingHorizontal: 15,
          }}>
          {showPassword ? (
            <EyeClosedIcon color={theme.text} width={20} />
          ) : (
            <EyeIcon color={theme.text} width={20} />
          )}
        </TouchableOpacity>
      </View>
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

export default PasswordInput;
