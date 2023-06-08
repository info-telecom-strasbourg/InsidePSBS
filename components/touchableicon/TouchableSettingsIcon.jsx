import React from "react";
import styles from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { SettingsIcon } from "../../assets/icons";
import { Link } from "expo-router";
import { View } from "react-native";

const TouchableSettingsIcon = () => {
  const { theme } = useTheme();

  return (
    <Link href={ROUTES.settings}>
      <View style={styles.iconContainer}>
        <SettingsIcon width={31} height={31} color={theme.text} />
      </View>
    </Link>
  );
};

export default TouchableSettingsIcon;
