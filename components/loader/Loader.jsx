import React from "react";
import Lottie from "lottie-react-native";
import { useTheme } from "../../contexts";
import { Dimensions, View } from "react-native";

const Loader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height - 100,
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
