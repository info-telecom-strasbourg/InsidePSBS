import React from "react";
import { useTheme } from "../../contexts";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants";
import { PlusIcon } from "../../assets/icons";
import { TouchableOpacity } from "react-native";

const PlusButton = () => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          bottom: 21,
          right: 11,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <PlusIcon color={COLORS.white} height={21} width={21} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PlusButton;
