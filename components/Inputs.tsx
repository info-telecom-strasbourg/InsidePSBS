import {
  Picker as NativePicker,
  PickerProps as NativePickerProps,
} from "@react-native-picker/picker";
import { EyeClosedIcon, EyeIcon } from "assets/icons";
import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { useTheme } from "contexts/themeContext";
import { useState } from "react";
import {
  TextInput as Entry,
  TextInputProps as EntryProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Body3 } from "./Text";

type TextInputProps = EntryProps & {
  label?: string;
  error?: string;
  type: "text" | "password";
};

type PickerProps = NativePickerProps & {
  items: PickerItem[];
  label: string;
};

type PickerItem = {
  short_name: string;
  id: number;
};

export const TextInput = ({
  style,
  label,
  error,
  type = "text",
  ...props
}: TextInputProps) => {
  const { theme } = useTheme();
  props.maxLength = props.maxLength | 4000000000;

  if (type === "password") {
    props.autoCapitalize = "none";
    props.autoCorrect = false;
  }
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View>
      <Text style={[{ color: theme.text }, styles.textInputLabel]}>
        {label}
      </Text>
      <View style={{ height: 10 }} />
      <View style={{ position: "relative" }}>
        <Entry
          style={[
            styles.textInputEntry,
            { backgroundColor: theme.box, color: theme.text },
            type === "password" && { paddingRight: 50 },
            style,
          ]}
          secureTextEntry={type === "password" && !showPassword}
          placeholderTextColor={theme.text_secondary}
        />
        {type === "password" && (
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
        )}
      </View>
      {error && (
        <>
          <View style={{ height: 5 }} />
          <Body3 style={{ color: COLORS.dark_red }}>{error}</Body3>
        </>
      )}
    </View>
  );
};

export const Picker = ({
  items,
  selectedValue,
  label,
  ...props
}: PickerProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={[{ color: theme.text }, styles.textInputLabel]}>
        {label}
      </Text>
      <View style={{ height: 10 }} />
      <View style={{ borderRadius: 15, overflow: "hidden" }}>
        <NativePicker
          selectedValue={selectedValue}
          itemStyle={{ color: theme.text, fontFamily: FONTS.OpenSans.semiBold }}
          dropdownIconColor={theme.text}
          dropdownIconRippleColor="none"
          style={[
            { backgroundColor: theme.box, color: theme.text },
            styles.textInputEntry,
          ]}
          {...props}>
          {items?.map((item, index) => (
            <NativePicker.Item
              key={index}
              label={item.short_name}
              value={item.id}
            />
          ))}
        </NativePicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputEntry: {
    minHeight: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  },
  textInputLabel: {
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  },
});
