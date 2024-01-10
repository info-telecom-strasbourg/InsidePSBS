import { PrimaryButton } from "components/Button";
import Separator from "components/Separator";
import { Title1, Title4 } from "components/Text";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { ScreenContainer } from "components/Containers";

import { useRegister } from "../../../contexts/registerContext";

const ConfirmationScreen = () => {
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
        }}>
        <View style={{ width: "100%" }}>
          <Title1>Félicitations !</Title1>
          <Title1>
            Vous avez créé votre{" "}
            <Text style={{ color: COLORS.primary }}>compte fouaille</Text>
          </Title1>
        </View>
        <Separator size={20} vertical />
        <View style={{ width: "100%" }}>
          <Title4>Un mail vous a été envoyé pour activer votre compte</Title4>
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
