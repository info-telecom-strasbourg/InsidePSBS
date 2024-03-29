import React from "react";
import { Picker as NativePicker } from "@react-native-picker/picker";
import styles from "./input.style";
import { useTheme } from "../../contexts";
import { Text, View } from "react-native";
import { FONTS } from "../../constants";

const Picker = ({ items, value, onValueChange, label }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={styles.textInputLabel(theme)}>{label}</Text>
      <View style={{ height: 10 }} />
      <View style={{ borderRadius: 15, overflow: "hidden" }}>
        <NativePicker
          selectedValue={value}
          itemStyle={{ color: theme.text, fontFamily: FONTS.OpenSans.semiBold }}
          dropdownIconColor={theme.text}
          dropdownIconRippleColor="none"
          onValueChange={onValueChange}
          style={styles.textInputEntry(theme)}
        >
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

export default Picker;
