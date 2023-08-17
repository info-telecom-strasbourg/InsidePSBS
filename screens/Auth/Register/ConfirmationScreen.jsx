import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { PrimaryButton, ScreenContainer, Separator } from "../../../components";
import { API, COLORS, ROUTES } from "../../../constants";
import { useTheme } from "../../../contexts";
import { useRegister } from "../../../contexts/registerContext";
import { text_styles } from "../../../styles";

const ConfirmationScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { signUp, entries } = useRegister();

  useEffect(() => {
    signUp(entries);
  }, []);

  return (
    <ScreenContainer>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={text_styles.title1(theme)}>Félicitations !</Text>
          <Text style={text_styles.title1(theme)}>
            Vous avez créé votre{" "}
            <Text style={{ color: COLORS.primary }}>compte fouaille</Text>
          </Text>
        </View>
        <Separator size={20} vertical />
        <View style={{ width: "100%" }}>
          <Text style={text_styles.title4(theme)}>
            Un mail vous a été envoyé pour activer votre compte
          </Text>
          <Separator size={30} vertical />
          <PrimaryButton
            text="J'ai validé mon email"
            onPress={() => router.replace(ROUTES.auth)}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ConfirmationScreen;
