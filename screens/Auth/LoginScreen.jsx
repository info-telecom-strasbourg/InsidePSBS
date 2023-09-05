import React, { useState } from "react";
import {
  BackButtonTopbar,
  PrimaryButton,
  ScrollScreenContainer,
  SecondaryButton,
  TextInput,
} from "../../components";
import { COLORS, ROUTES, TEXT, ERRORS } from "../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth, useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { useRouter } from "expo-router";
import PasswordInput from "../../components/input/PasswordInput";
import { useEffect } from "react";

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
    setErrorMessage("")
  }, [])

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
            autoComplete={"email"}
            autoCapitalize="none"
          />
          <View style={{ height: 15 }} />
          <PasswordInput
            autoComplete={"current-password"}
            value={result.password}
            onChangeText={(val) =>
              setResult((prev) => ({ ...prev, password: val }))
            }
            label={TEXT.authentification.password}
          />
          <View style={{ height: 20 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={text_styles.body3({ text: theme.text })}>
            {TEXT.authentification.login.forgot_password}
          </Text>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            onPress={() => router.push(`${ROUTES.forgot_password}`)}
          >
            <Text style={text_styles.body3({ text: COLORS.primary })}>
              {TEXT.authentification.login.reset_password}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <PrimaryButton
          text={TEXT.authentification.login.submit}
          onPress={() => {
            if (result.email === "" || result.password === "" ||
              result.email === "" && result.password === "") {
              setErrorMessage(TEXT.authentification.login.no_information_while_login)
              return;
            } else {
              login(result).then((res) => {
                setTokenVerifyEmail(res)
              }).catch((err) => {
                console.log("grrrr", err)
              })
            }
          }}
        />
        <View style={{ height: 20 }} />
        <Text style={text_styles.body3({ text: COLORS.dark_red })}>
          {errorMessage !== ERRORS[409] ? errorMessage : `${TEXT.authentification.verify_email.message}`}
        </Text>
        <View style={{ height: 20 }} />

        {tokenVerifyEmail ? <SecondaryButton
          text={TEXT.authentification.verify_email.button} onPress={() => {
            reset_email(tokenVerifyEmail)
          }} /> : ""}
      </View>
    </ScrollScreenContainer>
  );
};

export default LoginScreen;
