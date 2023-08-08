import React from "react";
import { PrimaryButton, ScreenContainer, Separator } from "../../../components";
import { Text, View } from "react-native";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { useRouter } from "expo-router";
import { COLORS, ROUTES } from "../../../constants";

const ConfirmationScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
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
            text="J'ai activé mon compte"
            onPress={() => router.replace(ROUTES.auth)}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ConfirmationScreen;
