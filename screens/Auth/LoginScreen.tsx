import { PrimaryButton, SecondaryButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { TextInput } from "components/Inputs";
import { Body3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import ERRORS from "constants/errors";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useAuth } from "contexts/authContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "../../contexts/themeContext";

const LoginScreen = () => {
  const { login, reset_email, errorMessage, setErrorMessage } = useAuth();
  const [result, setResult] = useState({
    email: "",
    password: "",
  });
  const [tokenVerifyEmail, setTokenVerifyEmail] = useState(null);
  const { theme } = useTheme();
  const router = useRouter();

  /* 
    to clean error message after exiting page,
    useEffect for this is maybe overkill but works,
    maybe there is a cleaner way to do this ?
  */
  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.authentification.login.title}
      </BackButtonTopbar>
      <View style={{ padding: 15 }}>
        {/* <View style={{ flexDirection: "row-reverse" }}>
          <TouchableOpacity onPress={() => router.push(`${ROUTES.register}/1`)}>
            <Text style={text_styles.body3({ text: COLORS.primary })}>
              {TEXT.authentification.register.title}
            </Text>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
          <Text style={text_styles.body3({ text: theme.text })}>
            {TEXT.authentification.login.not_registered}
          </Text>
        </View> */}
        <View style={{ height: 15 }} />

        <View>
          <TextInput
            value={result.email}
            onChangeText={(val) =>
              setResult((prev) => ({ ...prev, email: val }))
            }
            label={TEXT.authentification.email}
            autoComplete="email"
            autoCapitalize="none"
          />
          <View style={{ height: 15 }} />
          <TextInput
            type="password"
            autoComplete="current-password"
            value={result.password}
            onChangeText={(val) =>
              setResult((prev) => ({ ...prev, password: val }))
            }
            label={TEXT.authentification.password}
          />
          <View style={{ height: 20 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Body3 style={{ color: theme.text }}>
            {TEXT.authentification.login.forgot_password}
          </Body3>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            onPress={() => router.push(`${ROUTES.forgot_password}`)}>
            <Body3 style={{ color: COLORS.primary }}>
              {TEXT.authentification.login.reset_password}
            </Body3>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <PrimaryButton
          text={TEXT.authentification.login.submit}
          onPress={() => {
            if (
              result.email === "" ||
              result.password === "" ||
              (result.email === "" && result.password === "")
            ) {
              setErrorMessage(
                TEXT.authentification.login.no_information_while_login,
              );
            } else {
              login(result)
                .then((res) => {
                  setTokenVerifyEmail(res);
                })
                .catch((err) => {
                  console.log("grrrr", err);
                });
            }
          }}
        />
        <View style={{ height: 20 }} />
        <Body3 style={{ color: COLORS.dark_red }}>
          {errorMessage !== ERRORS[409]
            ? errorMessage
            : `${TEXT.authentification.verify_email.message}`}
        </Body3>
        <View style={{ height: 20 }} />

        {tokenVerifyEmail ? (
          <SecondaryButton
            text={TEXT.authentification.verify_email.button}
            onPress={() => {
              reset_email(tokenVerifyEmail);
            }}
          />
        ) : (
          ""
        )}
      </View>
    </ScrollScreenContainer>
  );
};

export default LoginScreen;
