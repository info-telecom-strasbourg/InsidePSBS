import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import styles from "./touchableicon.style";
import { ChevronLeftIcon } from "../../assets/icons";
import { useTheme } from "../../contexts";

const TouchableBackIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.iconContainer()}
      onPress={() => router.back()}
    >
      <ChevronLeftIcon width={13} height={24} color={theme.text} />
    </TouchableOpacity>
  );
};

export default TouchableBackIcon;
