import React from "react";
import { Text, View } from "react-native";
import textStyle from "../../styles/text.style";
import { COLORS } from "../../constants";

const Loader = () => {
  return (
    <View>
      <Text style={textStyle.title3(COLORS.primary)}>Loading ...</Text>
    </View>
  );
};

export default Loader;
