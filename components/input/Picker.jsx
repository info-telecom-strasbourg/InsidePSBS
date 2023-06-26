import React from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import styles from "./input.style";
import { useTheme } from "../../contexts";
import { Text, View } from "react-native";

const Picker = ({ items, value, onValueChange, label }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 10 }} />
      <View style={{ borderRadius: 15, overflow: "hidden" }}>
        <NativePicker
          selectedValue={value}
          dropdownIconColor={theme.text}
          dropdownIconRippleColor="none"
          onValueChange={onValueChange}
          style={styles.textInputEntry(theme)}
        >
          {items?.map((item, index) => (
            <NativePicker.Item
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </NativePicker>
      </View>
    </View>
  );
};

export default Picker;
