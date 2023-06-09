import React from "react";
import { View } from "react-native";
import BackButtonTopbar from "../../components/topbar/BackButtonTopbar";
import { TEXT } from "../../constants";

const FouailleScreen = () => {
  return (
    <>
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
    </>
  );
};

export default FouailleScreen;
