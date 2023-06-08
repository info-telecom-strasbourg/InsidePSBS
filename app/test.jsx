import React from "react";
import { View } from "react-native";
import ColoredButton from "../components/buttons/ColoredButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { COLORS } from "../constants";

const Test = () => {
  return (
    <View>
      <ColoredButton
        text="Suivant"
        color="white"
        backgroundColor={COLORS.dark_red}
      />
      <SecondaryButton text="Bouton" />
    </View>
  );
};

export default Test;
