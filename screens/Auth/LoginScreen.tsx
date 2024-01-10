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
import { useLogin } from "queries/auth/login";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "../../contexts/themeContext";

type formType = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [result, setResult] = useState<formType>({
    email: "",
    password: "",
  });

  const updateResult = (key: "email" | "password", value: string) =>
    setResult((prev) => ({ ...prev, [key]: value }));

  const { theme } = useTheme();
  const router = useRouter();
  const { login, error, isLoading } = useLogin();

  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.authentification.login.title}
      </BackButtonTopbar>
      <KeyboardAvoidingContainer
        style={{
          padding: 15,
          gap: 20,
        }}>
        <TextInput
          type="email"
          value={result.email}
          onChangeText={(val) => updateResult("email", val)}
          label={TEXT.authentification.email}
        />
        <TextInput
          type="password"
          autoComplete="current-password"
          value={result.password}
          onChangeText={(val) => updateResult("password", val)}
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
        <PrimaryButton
          text={TEXT.authentification.login.submit}
          onPress={() => login(result)}
          loading={isLoading}
          disabled={isLoading}
        />
        <Body3 style={{ color: COLORS.dark_red }}>{error}</Body3>
      </KeyboardAvoidingContainer>
    </ScreenContainer>
  );
};

export default LoginScreen;
