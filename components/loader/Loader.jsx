import React from "react";
import Lottie from "lottie-react-native";
import { View } from "react-native";

const Loader = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
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
