import { useRouter, useLocalSearchParams } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { API, ROUTES } from "../../../constants";
import { RegisterProvider } from "../../../contexts/registerContext";
import CGUScreen from "../../../screens/Auth/Register/CGUScreen";
import ConfirmationScreen from "../../../screens/Auth/Register/ConfirmationScreen";
import GeneralInformationsScreen from "../../../screens/Auth/Register/GeneralInformationsScreen";
import PersonalInformationsScreen from "../../../screens/Auth/Register/PersonalInformationsScreen";

const Step = () => {
  const router = useRouter();
  const { step } = useLocalSearchParams();

  return (
    <>
      {step === "1" && <GeneralInformationsScreen />}
      {step === "2" && <PersonalInformationsScreen />}
      {step === "3" && <CGUScreen />}
      {/* {step === "4" && <ConfirmationScreen />} */}
    </>
  );
};

export default Step;
