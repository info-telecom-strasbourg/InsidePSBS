import React from "react";
import { ScreenContainer } from "../components";
import { useNavigation } from "expo-router";
import FouailleScreen from "../screens/Fouaille/FouailleScreen";

const Fouaille = () => {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <FouailleScreen />
    </ScreenContainer>
  );
};

export default Fouaille;
