import { BackButtonTopbar, DefaultTopbar } from "components/Topbar";
import ScreenContainer from "components/screencontainer/ScreenContainer";
import ROUTES from "constants/routes";
import authentificationText from "constants/text/authentification";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { RegisterProvider } from "../../../contexts/registerContext";

const RegisterLayout = () => {
  const { step } = useLocalSearchParams<{ step: string }>();
  const router = useRouter();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactive = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

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
            {authentificationText.register.title}
          </BackButtonTopbar>
        )}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        />
      </ScreenContainer>
    </RegisterProvider>
  );
};

export default RegisterLayout;
