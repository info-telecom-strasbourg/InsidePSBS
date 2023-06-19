import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";
import styles from "./touchableicon.style";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

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
