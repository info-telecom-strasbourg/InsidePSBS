import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import touchableIconStyle from "./touchableicon.style";
import { useTheme } from "../../contexts/themeContext";
import { ChevronLeftIcon } from "../../assets/icons";

const TouchableBackIcon = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = touchableIconStyle();

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
