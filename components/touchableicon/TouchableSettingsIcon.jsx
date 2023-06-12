import React from "react";
import { TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

import touchableIconStyles from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = touchableIconStyles();

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => router.push(ROUTES.settings)}
    >
      <SettingsIcon width={31} height={31} color={theme.text} />
    </TouchableOpacity>
  );
};

export default TouchableSettingsIcon;
