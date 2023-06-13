import React from "react";
import { ScrollScreenContainer } from "../components";
import { useNavigation } from "expo-router";
import FouailleScreen from "../screens/Fouaille/FouailleScreen";

const Fouaille = () => {
  const navigation = useNavigation();
  return (
    <ScrollScreenContainer>
      <FouailleScreen />
    </ScrollScreenContainer>
  );
};

export default Fouaille;
