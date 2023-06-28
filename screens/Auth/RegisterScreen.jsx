import React, { useEffect, useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";
import {
  DefaultTopbar,
  ProgressBar,
  ScreenContainer,
  Topbar,
  TouchableBackIcon,
} from "../../components";
import { API, TEXT } from "../../constants";
import Cgu from "./RegisterSteps/CGU";
import axios from "axios";
import PersonalInformations from "./RegisterSteps/PersonalInformations";
import GeneralInformations from "./RegisterSteps/GeneralInformations";

const RegisterScreen = () => {
  const steps = 5;
  const [step, setStep] = useState(1);
  const [entries, setEntries] = useState({
    email: "romain.bourdain93@gmail.com",
    password: "azertyuioP0",
    password_confirmation: "azertyuioP0",
    first_name: "Romain",
    last_name: "Bourdain",
    user_name: "romain.bourdain",
    phone: "0637297485",
    promotion_year: "2025",
    sector: 2,
  });

  const sendData = async () => {
    try {
      const res = await axios.post(`${API.url}/register`, entries, {
        headers: {
          ...API.headers,
        },
      });
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
