import React, { useState } from "react";
import SettingButton from "./SettingButton";
import { Switch } from "react-native";
import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";

const SettingSwitch = ({ text, onPress, value }) => {
  const [active, setActive] = useState(value);
  const { theme } = useTheme();
  return (
    <SettingButton
      text={text}
      style={{ paddingRight: 5 }}
      onPress={() => setActive((a) => !a)}
      rightIcon={
        <Switch
          trackColor={{
            false: theme.text_secondary,
            true: COLORS.light_primary,
          }}
          thumbColor={active ? COLORS.primary : theme.text}
          onValueChange={() => setActive((a) => !a)}
          value={active}
          style={{ height: 14 }}
        />
      }
    />
  );
};

export default SettingSwitch;
