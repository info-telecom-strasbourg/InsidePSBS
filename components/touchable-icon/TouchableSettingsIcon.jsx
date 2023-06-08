import React from "react";
import styles from "./touchable_icon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";
import { Link } from "expo-router";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();

  return (
    <Link style={styles.iconContainer} href={ROUTES.home}>
      <SettingsIcon width={31} height={31} color={theme.text} />
    </Link>
  );
};

export default TouchableSettingsIcon;
