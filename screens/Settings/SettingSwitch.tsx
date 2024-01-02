import COLORS from "constants/colors";
import React, { useState } from "react";
import { GestureResponderEvent, Switch } from "react-native";

import SettingButton from "./SettingButton";
import { useTheme } from "../../contexts/themeContext";

const SettingSwitch = ({
  text,
  onPress,
  value,
}: {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  value: boolean;
}) => {
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
