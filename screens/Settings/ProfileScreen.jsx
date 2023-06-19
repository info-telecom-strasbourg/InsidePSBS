import React from "react";
import { BackButtonTopbar } from "../../components";
import { TEXT } from "../../constants";

const ProfileScreen = () => {
  return (
    <>
      <BackButtonTopbar>{TEXT.settings.profile.title}</BackButtonTopbar>
    </>
  );
};

export default ProfileScreen;
