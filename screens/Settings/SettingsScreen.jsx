import React from "react";
import { BackButtonTopbar, ScrollScreenContainer } from "../../components";
import { TEXT } from "../../constants";

const SettingsScreen = () => {
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
