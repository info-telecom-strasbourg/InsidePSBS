import { PrimaryButton } from "components/Button";
import {
  KeyboardAvoidingContainer,
  ScreenContainer,
} from "components/Containers";
import { TextInput } from "components/Inputs";
import { Body2, Body3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { handleForgotPasswordError } from "errors/handleForgotPasswordError";
import { useRouter } from "expo-router";
import { forgotPassword } from "queries/auth/forgot-password";
import React from "react";
import { successToast } from "utils/toast";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handle_submit = async () => {
    console.log("fallback: ");
    try {
      await forgotPassword(email);
      successToast("Un email de réinitialisation vous a été envoyé.");
      router.replace(ROUTES.auth);
    } catch (e) {
      const errorMessage = handleForgotPasswordError(e);
      setError(errorMessage);
    }
  };

  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.authentification.forgot_password.title}
      </BackButtonTopbar>
      <KeyboardAvoidingContainer style={{ padding: 15, gap: 30 }}>
        <Body2>{TEXT.authentification.forgot_password.description}</Body2>
        <TextInput
          type="email"
          label={TEXT.authentification.email}
          onChangeText={(input) => setEmail(input)}
          value={email}
          placeholder={TEXT.authentification.placeholders.email}
        />
        <PrimaryButton
          text={TEXT.authentification.forgot_password.submit}
          onPress={handle_submit}
        />
        <Body3 style={{ color: COLORS.dark_red }}>{error}</Body3>
      </KeyboardAvoidingContainer>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;
