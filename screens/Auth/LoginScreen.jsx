import React, { useState } from "react";
import {
  DefaultTopbar,
  PrimaryButton,
  ScrollScreenContainer,
  TextInput,
} from "../../components";
import { COLORS, ROUTES, TEXT } from "../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth, useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const { login, errorMessage } = useAuth();
  const [result, setResult] = useState({
    email: "bergaminienzo62@gmail.com",
    password: "azertyuiop",
  });
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollScreenContainer>
      <DefaultTopbar rightIcon={<></>}>
        {TEXT.authentification.login.title}
      </DefaultTopbar>
      <View style={{ padding: 15 }}>
        <TextInput
          value={result.email}
          onChangeText={(val) => setResult((prev) => ({ ...prev, email: val }))}
          label={TEXT.authentification.email}
        />
        <View style={{ height: 15 }} />
        <TextInput
          value={result.password}
          onChangeText={(val) =>
            setResult((prev) => ({ ...prev, password: val }))
          }
          label={TEXT.authentification.password}
        />
        <View style={{ height: 20 }} />
        <View style={{ flexDirection: "row" }}>
          <Text style={text_styles.body3({ text: theme.text })}>
            {TEXT.authentification.login.not_registered}
          </Text>
          <View style={{ width: 5 }} />
          <TouchableOpacity onPress={() => router.push(ROUTES.register)}>
            <Text style={text_styles.body3({ text: COLORS.primary })}>
              {TEXT.authentification.register.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <PrimaryButton
          text={TEXT.authentification.login.submit}
          onPress={() => login(result)}
        />
        <View style={{ height: 20 }} />
        <Text style={text_styles.body3({ text: COLORS.dark_red })}>
          {errorMessage}
        </Text>
      </View>
    </ScrollScreenContainer>
  );
};

export default LoginScreen;
