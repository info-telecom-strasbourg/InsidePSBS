import React from "react";
<<<<<<< HEAD
import { TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

import touchableIconStyles from "./touchableicon.style";
=======
import styles from "./touchableicon.style";
>>>>>>> parent of b866aa0 (refactoring)
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";
import { Link } from "expo-router";
import { View } from "react-native";

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
