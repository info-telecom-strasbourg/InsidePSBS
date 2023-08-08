import React, { useState } from "react";
import { ScreenContainer, Topbar } from "../../components";
import { Stack, useSearchParams } from "expo-router";

const ExempleLayout = () => {
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();
  return (
    <ScreenContainer>
      <Topbar>Exemple {searchParams?.id}</Topbar>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </ScreenContainer>
  );
};

export default ExempleLayout;
