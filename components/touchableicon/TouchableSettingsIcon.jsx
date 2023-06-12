import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import touchableIconStyles from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();

  const styles = touchableIconStyles();

  return (
    <Link href={ROUTES.settings}>
      <View style={styles.iconContainer}>
        <SettingsIcon width={31} height={31} color={theme.text} />
      </View>
    </Link>
  );
};

export default TouchableSettingsIcon;
