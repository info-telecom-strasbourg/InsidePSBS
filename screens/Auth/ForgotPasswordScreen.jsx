import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import {
  BackButtonTopbar,
  PrimaryButton,
  ScreenContainer,
  Separator,
} from "../../components";
import TextInput from "../../components/input/TextInput";
import { API, COLORS, ROUTES, TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { checkAlreadyExist, checkEmail } from "../../utils";
import toast from "../../utils/toast";

const ForgotPasswordScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    setError("");
    if (!checkEmail(email)) {
      setError(TEXT.authentification.errors.email);
      return;
    }
    if (await checkAlreadyExist("email", email)) {
      setError(TEXT.authentification.errors.email_not_found);
      return;
    }
    try {
      const res = await axios.post(`${API.url}/api/forgot-password`, {
        email: email,
      });
      if (res.status == 200) {
        toast(TEXT.authentification.forgot_password.email_sent, {
          backgroundColor: theme.box,
          textColor: theme.text,
        });
        router.push(`${ROUTES.auth}`);
      } else {
        toast(TEXT.authentification.forgot_password.error, {
          backgroundColor: theme.box,
          textColor: theme.text,
        });
      }
    } catch (e) {
      console.error("error");
      console.log(e.response);
    }
  };

  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}>
        <View style={{ width: "100%" }}>
          <Text style={{ ...text_styles.title3(theme), color: COLORS.primary }}>
            {TEXT.authentification.forgot_password.title}
          </Text>
        </View>
        <Separator size={20} vertical />
        <View style={{ width: "100%" }}>
          <Text style={text_styles.body2(theme)}>
            {TEXT.authentification.forgot_password.description}
          </Text>
          <View style={{ height: 30 }} />
          <TextInput
            label={TEXT.authentification.email}
            onChangeText={(input) => setEmail(input)}
            value={email}
            autoComplete="email"
            placeholder={TEXT.authentification.placeholders.email}
            error={error}
            autoCapitalize="none"
          />
          <Separator size={30} vertical />
          <PrimaryButton
            text={TEXT.authentification.forgot_password.submit}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;
