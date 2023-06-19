import React from "react";
import { BackButtonTopbar } from "../../components";
import { TEXT } from "../../constants";

const SettingsScreen = () => {
  return (
    <>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
    </>
  );
};

export default SettingsScreen;
