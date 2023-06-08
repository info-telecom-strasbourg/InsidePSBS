import React from "react";
import styles from "./touchable_icon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { ChevronLeftIcon } from "../../assets/icons";
import { Link } from "expo-router";

const TouchableBackIcon = () => {
  const { theme } = useTheme();

  return (
    <Link style={styles.iconContainer} href={ROUTES.home}>
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </Link>
  );
};

export default TouchableBackIcon;
