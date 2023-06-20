import React, { useState } from "react";
import {
  DefaultTopbar,
  PrimaryButton,
  ScrollScreenContainer,
  TextInput,
} from "../../components";
import { COLORS, TEXT } from "../../constants";
import { Text, View } from "react-native";
import { useAuth } from "../../contexts";
import { text_styles } from "../../styles";

const LoginScreen = () => {
  const { login, errorMessage, token } = useAuth();
  const [result, setResult] = useState({
    email: "bergaminienzo62@gmail.com",
    password: "azertyuiop",
  });

  console.log(token);
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
        <Text>{TEXT.authentification.login.not_registered}</Text>
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
