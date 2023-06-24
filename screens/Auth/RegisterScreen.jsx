import React, { useEffect, useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";
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

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const steps = 5;
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
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        >
          <GeneralInformations nextStep={nextStep} />
          <PersonalInformations nextStep={nextStep} />
          <Cgu nextStep={nextStep} />
        </Animated.View>
      </ScreenContainer>
    </>
  );
};

export default RegisterScreen;
