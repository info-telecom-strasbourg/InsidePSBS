import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import GeneralInformationsScreen from "../../../screens/Auth/Register/GeneralInformationsScreen";
import PersonalInformationsScreen from "../../../screens/Auth/Register/PersonalInformationsScreen";
import CGUScreen from "../../../screens/Auth/Register/CGUScreen";
import { API, ROUTES } from "../../../constants";
import { View } from "react-native";
import ConfirmationScreen from "../../../screens/Auth/Register/ConfirmationScreen";
import { RegisterProvider } from "../../../contexts/registerContext";

const Step = () => {
  const router = useRouter();
  const { step } = useLocalSearchParams();

  return (
    <>
      {step === "1" && <GeneralInformationsScreen />}
      {step === "2" && <PersonalInformationsScreen />}
      {step === "3" && <CGUScreen />}
      {step === "4" && <ConfirmationScreen />}
    </>
  );
};

export default Step;
