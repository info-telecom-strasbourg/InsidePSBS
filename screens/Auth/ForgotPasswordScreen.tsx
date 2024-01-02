import { PrimaryButton } from "components/Button";
import { TextInput } from "components/Inputs";
import Separator from "components/Separator";
import { Body2, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import TEXT from "constants/text";
import React from "react";
import { View } from "react-native";
import { ScreenContainer } from "react-native-screens";
import debug from "utils/debug";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 25,
        }}>
        <View style={{ width: "100%" }}>
          <Title3 style={{ color: COLORS.primary }}>
            {TEXT.authentification.forgot_password.title}
          </Title3>
        </View>
        <Separator size={20} vertical />
        <View style={{ width: "100%" }}>
          <Body2>{TEXT.authentification.forgot_password.description}</Body2>
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
            onPress={() => debug("submit")}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;
