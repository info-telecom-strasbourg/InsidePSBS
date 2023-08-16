import React, { useEffect, useRef } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import { Animated, useWindowDimensions } from "react-native";
import {
  BackButtonTopbar,
  DefaultTopbar,
  ProgressBar,
  ScreenContainer,
} from "../../../components";
import { useTheme } from "../../../contexts";
import { RegisterProvider } from "../../../contexts/registerContext";

const STEPS = 4;

const RegisterLayout = () => {
  const { step } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

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

  const previousStep = () => {
    if (Number(step) === 1) router.back();
    else router.push(`${ROUTES.register}/${Number(step) - 1}`);
  };

  return (
    <RegisterProvider>
      <ScreenContainer>
        {Number(step) === 4 ? (
          <DefaultTopbar />
        ) : (
          <BackButtonTopbar rightIcon={<></>} onPress={previousStep}>
            {TEXT.authentification.register.title}
          </BackButtonTopbar>
        )}
        <ProgressBar steps={STEPS} step={step} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
            backgroundColor: COLORS.primary,
          }}
        />
      </ScreenContainer>
    </RegisterProvider>
  );
};

export default RegisterLayout;
