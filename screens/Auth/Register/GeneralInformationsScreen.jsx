import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  PrimaryButton,
  ScrollScreenContainer,
  Separator,
  TextInput,
} from "../../../components";
import { ROUTES, TEXT, COLORS } from "../../../constants";
import { useTheme } from "../../../contexts";
import { useRegister } from "../../../contexts/registerContext";
import { text_styles } from "../../../styles";
import {
  checkAlreadyExist,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
} from "../../../utils";
import PasswordInput from "../../../components/input/PasswordInput";
import { Step1 } from "../../../assets/icons";

const GAP = 15;

const GeneralInformationsScreen = () => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const setError = (key, value) => {
    setErrors((e) => ({
      ...e,
      [key]: value,
    }));
  };

  const { entries, updateEntry } = useRegister();
  const { theme } = useTheme();
  const router = useRouter();
  const { step } = useLocalSearchParams();

  const handleSubmit = async () => {
    setErrors({
      email: "",
      password: "",
      password_confirmation: "",
    });

    if (!checkEmail(entries.email))
      return setError("email", TEXT.authentification.errors.email);
    if (!checkPassword(entries.password))
      return setError("password", TEXT.authentification.errors.password);
    if (
      !checkPasswordConfirmation(
        entries.password,
        entries.password_confirmation
      )
    )
      return setError(
        "password_confirmation",
        TEXT.authentification.errors.password_confirmation
      );
    if (!(await checkAlreadyExist("email", entries.email)))
      return setError("email", TEXT.authentification.errors.email_already_used);

    router.push(`${ROUTES.register}/${Number(step) + 1}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollScreenContainer>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Step1
            TextColor={theme.text}
            DarkBackgroundColor={theme.box}
            AccentColor={COLORS.dark_orange}
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
          <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
            {TEXT.authentification.register.general_information}
          </Text>
          <Separator size={25} vertical />
          <TextInput
            label={TEXT.authentification.email}
            onChangeText={(val) => updateEntry("email", val)}
            value={entries.email}
            autoComplete="email"
            placeholder={TEXT.authentification.placeholders.email}
            error={errors.email}
            autoCapitalize="none"
          />
          <Separator vertical size={GAP} />
          <PasswordInput
            label={TEXT.authentification.password}
            onChangeText={(val) => updateEntry("password", val)}
            value={entries.password}
            secureTextEntry
            autoComplete="new-password"
            placeholder={TEXT.authentification.placeholders.password}
            error={errors.password}
          />
          <Separator vertical size={GAP} />
          <PasswordInput
            label={TEXT.authentification.password_confirmation}
            onChangeText={(val) => updateEntry("password_confirmation", val)}
            value={entries.password_confirmation}
            autoComplete="new-password"
            placeholder={TEXT.authentification.placeholders.password}
            error={errors.password_confirmation}
          />
          <Separator size={25} vertical />
          <PrimaryButton
            text={TEXT.authentification.register.next}
            onPress={handleSubmit}
          />
        </View>
      </ScrollScreenContainer>
    </SafeAreaView>
  );
};

export default GeneralInformationsScreen;
