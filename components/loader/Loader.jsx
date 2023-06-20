import React from "react";
import Lottie from "lottie-react-native";
import { View } from "react-native";
import { useTheme } from "../../contexts";

const Loader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Lottie
        source={require("../../assets/loaders/loader.json")}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
