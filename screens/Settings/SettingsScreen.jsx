import React from "react";
import {
  BackButtonTopbar,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useAuth } from "../../contexts";

const SettingsScreen = () => {
  const { logout, token } = useAuth();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
      <PrimaryButton
        text="logout"
        onPress={() => {
          logout();
          console.log(token);
        }}
      />
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
