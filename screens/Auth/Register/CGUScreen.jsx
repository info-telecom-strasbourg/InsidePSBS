import React, { useState } from "react";

import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { PrimaryButton, ScreenContainer, Separator } from "../../../components";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import { useRouter, useLocalSearchParams } from "expo-router";
import CheckBox from "expo-checkbox";
import { Step4 } from "../../../assets/icons";
import { useRegister } from "../../../contexts/registerContext";
import toast from "../../../utils/toast";
import CGUText from "../../../components/CGU";
const CguScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const { entries, signUp } = useRegister();

  const handleSubmit = async () => {
    console.log("submitting");
    setError("");
    if (!checked) {
      setError(TEXT.authentification.errors.cgu);
      return;
    }
    try {
      await signUp(entries);
      toast("Votre compte a été créé. Validez-le par email", {
        backgroundColor: theme.box,
        textColor: theme.text,
      });
    } catch (e) {
      toast(
        "Une erreur est survenue. Veuillez réessayer ou contacter un administrateur",
        {
          backgroundColor: COLORS.light_red,
          textColor: COLORS.dark_red,
        }
      );
      console.log(e.message);
    } finally {
      router.push(ROUTES.auth);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Step4
            TextColor={theme.text}
            DarkBackgroundColor={theme.box}
            AccentColor={COLORS.dark_orange}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            flex: 1,
          }}
        >
          <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
            {TEXT.authentification.register.cgu}
          </Text>
          <Separator size={25} vertical />
          <CGUText />
          <Separator size={20} vertical />
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              color={checked ? COLORS.primary : theme.text}
              onValueChange={setChecked}
              value={checked}
            />
            <View style={{ width: 10 }} />
            <Text style={text_styles.body3(theme)}>
              {TEXT.authentification.register.accept_cgu}
            </Text>
          </View>
          <Separator size={10} vertical />
          <Text style={text_styles.body3({ text: COLORS.dark_red })}>
            {error}
          </Text>

          <Separator size={25} vertical />
          <PrimaryButton
            onPress={handleSubmit}
            text={TEXT.authentification.register.title}
          />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default CguScreen;
