import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import GeneralInformationsScreen from "../../../screens/Auth/Register/GeneralInformationsScreen";
import PersonalInformationsScreen from "../../../screens/Auth/Register/PersonalInformationsScreen";
import CGUScreen from "../../../screens/Auth/Register/CGUScreen";
import { ROUTES } from "../../../constants";
import { View } from "react-native";
import ConfirmationScreen from "../../../screens/Auth/Register/ConfirmationScreen";

const Step = () => {
  const [entries, setEntries] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    promotion_year: "",
    sector: 2,
  });

  const updateEntry = (key, value) => setEntries({ ...entries, [key]: value });

  const router = useRouter();
  const { step } = useLocalSearchParams();

  let Screen = View;

  switch (Number(step)) {
    case 1:
      Screen = GeneralInformationsScreen;
      break;
    case 2:
      Screen = PersonalInformationsScreen;
      break;
    case 3:
      Screen = CGUScreen;
      break;
    case 4:
      Screen = ConfirmationScreen;
      break;
    default:
      router.replace(ROUTES.auth);
      break;
  }

  return <Screen entries={entries} updateEntry={updateEntry} />;
};

export default Step;
