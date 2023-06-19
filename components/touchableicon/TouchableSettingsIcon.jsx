import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import styles from "./touchableicon.style";
import { SettingsIcon } from "../../assets/icons";
import { useTheme } from "../../contexts";
import { ROUTES } from "../../constants";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.iconContainer()}
      onPress={() => router.push(ROUTES.settings)}
    >
      <SettingsIcon width={31} height={31} color={theme.text} />
    </TouchableOpacity>
  );
};

export default TouchableSettingsIcon;
