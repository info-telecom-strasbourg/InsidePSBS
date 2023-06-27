import React, { useState } from "react";
import SettingButton from "./SettingButton";
import { Switch } from "react-native";
import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";

const SettingSwitch = ({ text }) => {
  const [active, setActive] = useState(false);
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
            true: COLORS.dark_primary,
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
