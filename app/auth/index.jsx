import React from "react";
import { Text, View } from "react-native";
import {
  ColoredButton,
  PrimaryButton,
  ScreenContainer,
  Separator,
} from "../../components";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";
import { COLORS, ROUTES } from "../../constants";
import { InsidePsbs } from "../../assets/icons";
import { useRouter } from "expo-router";

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
        }}
      >
        <View />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          <Text style={{ ...text_styles.body3(theme), alignSelf: "center" }}>
            Conditions d'utilisations
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AuthScreen;
