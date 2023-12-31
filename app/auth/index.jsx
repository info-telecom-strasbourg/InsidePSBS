import { useRouter } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { InsidePsbs } from "../../assets/icons";
import {
  ColoredButton,
  PrimaryButton,
  ScreenContainer,
  Separator,
} from "../../components";
import { COLORS, ROUTES } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const AuthScreen = () => {
  const { theme } = useTheme();
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
          <Text style={text_styles.title1(theme)}>Bienvenue sur</Text>
          <Text style={text_styles.title1({ text: COLORS.primary })}>
            Inside PSBS
          </Text>
        </View>
        <View>
          <PrimaryButton
            text="Créer un compte"
            onPress={() => router.push(`${ROUTES.register}/1`)}
          />
          <Separator vertical size={20} />
          <ColoredButton
            text="J'ai déjà un compte"
            background={theme.box}
            foreground={theme.text}
            onPress={() => router.push(ROUTES.login)}
          />
          <Separator vertical size={80} />
          <TouchableOpacity onPress={() => router.push(ROUTES.cgu)}>
            <Text style={{ ...text_styles.body3(theme), alignSelf: "center" }}>
              Conditions d'utilisations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
