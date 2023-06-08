import React from "react";
import styles from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { ChevronLeftIcon } from "../../assets/icons";
import { Link, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

const TouchableBackIcon = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => navigation.goBack()}
    >
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </TouchableOpacity>
  );
};

export default TouchableBackIcon;
