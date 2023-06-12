import React from "react";
import { useNavigation } from "expo-router";

import { PrimaryButton, ScreenContainer } from "../components";
import { ROUTES } from "../constants";

const Error = () => {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <Text>Error</Text>
      <PrimaryButton
        title="Retourner à la page d'accueil"
        onPress={() => navigation.navigate(ROUTES.home)}
      />
    </ScreenContainer>
  );
};

export default Error;
