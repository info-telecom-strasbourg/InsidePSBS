import React from "react";
import styles from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ROUTES } from "../../constants";
import { ChevronLeftIcon } from "../../assets/icons";
import { Link, useNavigation, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const TouchableBackIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => router.back()}
    >
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </TouchableOpacity>
  );
};

export default TouchableBackIcon;
