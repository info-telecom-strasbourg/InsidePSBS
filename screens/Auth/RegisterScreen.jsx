import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, useWindowDimensions } from "react-native";
import {
  DefaultTopbar,
  ProgressBar,
  ScreenContainer,
  Topbar,
  TouchableBackIcon,
} from "../../components";
import { TEXT } from "../../constants";
import GeneralInformations from "./RegisterSteps/GeneralInformations";
import PersonalInformations from "./RegisterSteps/PersonalInformations";
import Cgu from "./RegisterSteps/CGU";
import axios from "axios";

const RegisterScreen = () => {
  const steps = 5;
  const [step, setStep] = useState(1);
  const [entries, setEntries] = useState({
    email: "romain.bourdain93@gmail.com",
    password: "azertyuioP0",
    password_confirmation: "azertyuioP0",
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    promotion_year: "",
    sector: "",
  });

  const sendData = async () => {
    console.log(entries);
    try {
      const res = await axios.post(
        "https://app-pprd.its-tps.fr/api/register",
        entries,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const setEntry = (key, value) => {
    setEntries((i) => ({
      ...i,
      [key]: value,
    }));
  };

  const nextStep = () => {
    if (step < steps) {
      setStep((s) => s + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const { width } = useWindowDimensions();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactive = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width * (step - 1));
  }, [step, width]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        previousStep();
        return true;
      }
    );
  });

  return (
    <>
      <ScreenContainer>
        {step === 1 ? (
          <DefaultTopbar rightIcon={<></>}>
            {TEXT.authentification.register.title}
          </DefaultTopbar>
        ) : (
          <Topbar
            rightIcon={<></>}
            leftIcon={<TouchableBackIcon onPress={() => previousStep()} />}
          >
            {TEXT.authentification.register.title}
          </Topbar>
        )}
        <ProgressBar steps={steps} step={step} />
        <Animated.View
          style={{
            flexDirection: "row",
            paddingBottom: 30,
            flex: 1,
            width: steps * width,

            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        >
          <GeneralInformations
            nextStep={nextStep}
            entries={entries}
            setEntry={setEntry}
          />
          <PersonalInformations
            nextStep={nextStep}
            entries={entries}
            setEntry={setEntry}
          />

          <Cgu nextStep={sendData} entries={entries} />
        </Animated.View>
      </ScreenContainer>
    </>
  );
};

export default RegisterScreen;
