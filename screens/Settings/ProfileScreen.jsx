import React from "react";
import { BackButtonTopbar, ScrollScreenContainer } from "../../components";
import { TEXT } from "../../constants";

const ProfileScreen = () => {
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.profile.title}
      </BackButtonTopbar>
    </ScrollScreenContainer>
  );
};

export default ProfileScreen;
