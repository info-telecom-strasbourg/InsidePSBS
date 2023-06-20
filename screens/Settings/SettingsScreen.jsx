import React from "react";
import {
  BackButtonTopbar,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useAuth } from "../../contexts";

const SettingsScreen = () => {
  const { logout } = useAuth();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
      <PrimaryButton
        text="logout"
        onPress={() => {
          logout();
        }}
      />
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
