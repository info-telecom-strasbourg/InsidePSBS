import React, { useState } from "react";
import {
  DefaultTopbar,
  PrimaryButton,
  ScrollScreenContainer,
  TextInput,
} from "../../components";
import { TEXT } from "../../constants";
import { View } from "react-native";

const LoginScreen = () => {
  const [result, setResult] = useState({ email: "", password: "" });
  return (
    <ScrollScreenContainer>
      <DefaultTopbar>{TEXT.authentification.login.title}</DefaultTopbar>
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
        <View style={{ height: 40 }} />
        <PrimaryButton
          text={TEXT.authentification.login.submit}
          onPress={() => console.log(result)}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default LoginScreen;
