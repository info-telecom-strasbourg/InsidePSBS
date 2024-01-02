import { PrimaryButton } from "components/Button";
import Separator from "components/Separator";
import { Body3, Title2 } from "components/Text";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import CheckBox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { ScreenContainer } from "components/Containers";

import { Step4 } from "../../../assets/icons";
import CGUText from "../../../components/CGU";
import { useRegister } from "../../../contexts/registerContext";
import { useTheme } from "../../../contexts/themeContext";
import toast from "../../../utils/toast";

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
        },
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
          }}>
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
          }}>
          <Title2 style={{ fontSize: 23 }}>
            {TEXT.authentification.register.cgu}
          </Title2>
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
            <Body3>{TEXT.authentification.register.accept_cgu}</Body3>
          </View>
          <Separator size={10} vertical />
          <Body3 style={{ color: COLORS.dark_red }}>{error}</Body3>

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
