import { PrimaryButton } from "components/Button";
import {
  KeyboardAvoidingContainer,
  ScreenContainer,
} from "components/Containers";
import { TextInput } from "components/Inputs";
import { Body3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "../../contexts/themeContext";

const LoginScreen = () => {
  const [result, setResult] = useState({
    email: "",
    password: "",
  });
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.authentification.login.title}
      </BackButtonTopbar>
      <KeyboardAvoidingContainer
        style={{
          padding: 15,
          gap: 20,
          justifyContent: "center",
        }}>
        <TextInput
          value={result.email}
          onChangeText={(val) => setResult((prev) => ({ ...prev, email: val }))}
          label={TEXT.authentification.email}
          autoComplete="email"
          autoCapitalize="none"
        />
        <TextInput
          type="password"
          autoComplete="current-password"
          value={result.password}
          onChangeText={(val) =>
            setResult((prev) => ({ ...prev, password: val }))
          }
          label={TEXT.authentification.password}
        />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Body3 style={{ color: theme.text }}>
            {TEXT.authentification.login.forgot_password}
          </Body3>
          <TouchableOpacity
            onPress={() => router.push(`${ROUTES.forgot_password}`)}>
            <Body3 style={{ color: COLORS.primary }}>
              {TEXT.authentification.login.reset_password}
            </Body3>
          </TouchableOpacity>
        </View>
        <PrimaryButton text={TEXT.authentification.login.submit} />
      </KeyboardAvoidingContainer>
    </ScreenContainer>
  );
};

export default LoginScreen;
