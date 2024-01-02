import { PrimaryButton, SecondaryButton } from "components/Button";
import Separator from "components/Separator";
import { Body3, Title1 } from "components/Text";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "react-native-screens";

import { InsidePsbs } from "../../assets/icons";
import COLORS from "../../constants/colors";
import ROUTES from "../../constants/routes";

const AuthScreen = () => {
  const router = useRouter();
  return (
    <ScreenContainer>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "column",
          flex: 1,
          padding: 22,
        }}>
        <View />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          <InsidePsbs width={132} height={120} />
          <Separator vertical size={20} />
          <Title1>Bienvenue sur</Title1>
          <Title1 style={{ color: COLORS.primary }}>Inside PSBS</Title1>
        </View>
        <View>
          <PrimaryButton
            text="Créer un compte"
            onPress={() => router.push(`${ROUTES.register}/1`)}
          />
          <Separator vertical size={20} />
          <SecondaryButton
            text="J'ai déjà un compte"
            onPress={() => router.push(ROUTES.login)}
          />
          <Separator vertical size={80} />
          <TouchableOpacity onPress={() => router.push(ROUTES.cgu)}>
            <Body3 style={{ alignSelf: "center" }}>
              Conditions d&apos;utilisations
            </Body3>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
