import React from "react";
import { useTheme } from "../../contexts";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, ROUTES } from "../../constants";
import { PlusIcon } from "../../assets/icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const PlusButton = (props) => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`${ROUTES.form}${props.url}`)}
      style={{
        width: 50,
        height: 50,
        position: "absolute",
        bottom: 21,
        right: 11,
      }}
    >
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: "100%",
          width: "100%",
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
