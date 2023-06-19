import React from "react";
import { useNavigation } from "expo-router";

import { ScrollScreenContainer } from "../components";
import { FouailleScreen } from "../screens";

const Fouaille = () => {
  const navigation = useNavigation();
  return (
    <ScrollScreenContainer>
      <FouailleScreen />
    </ScrollScreenContainer>
  );
};

export default Fouaille;
