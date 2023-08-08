import React from "react";
import { PrimaryButton, ScreenContainer } from "../components";
import { useRouter } from "expo-router";

const Test = () => {
  const router = useRouter();

  return (
    <ScreenContainer>
      <PrimaryButton onPress={() => router.push("exemple")} text="Exemple" />
    </ScreenContainer>
  );
};

export default Test;
