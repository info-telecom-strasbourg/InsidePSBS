import { useLocalSearchParams } from "expo-router";

import CGUScreen from "../../../screens/Auth/Register/CGUScreen";
import GeneralInformationsScreen from "../../../screens/Auth/Register/GeneralInformationsScreen";
import PersonalInformationsScreen from "../../../screens/Auth/Register/PersonalInformationsScreen";

const Step = () => {
  const { step } = useLocalSearchParams();

  return (
    <>
      {step === "1" && <GeneralInformationsScreen />}
      {step === "2" && <PersonalInformationsScreen />}
      {step === "3" && <CGUScreen />}
    </>
  );
};

export default Step;
