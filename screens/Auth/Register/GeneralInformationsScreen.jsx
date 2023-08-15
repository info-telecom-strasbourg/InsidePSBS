import React, { useState } from "react";
import {
  PrimaryButton,
  ScrollScreenContainer,
  Separator,
  TextInput,
} from "../../../components";
import { ROUTES, TEXT } from "../../../constants";
import { Text, View } from "react-native";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  checkAlreadyExist,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
} from "../../../utils";

const GAP = 15;

const GeneralInformationsScreen = ({ entries, updateEntry }) => {
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
    <ScrollScreenContainer>
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
        />
        <Separator vertical size={GAP} />
        <TextInput
          label={TEXT.authentification.password}
          onChangeText={(val) => updateEntry("password", val)}
          value={entries.password}
          secureTextEntry
          autoComplete="password"
          placeholder={TEXT.authentification.placeholders.password}
          error={errors.password}
        />
        <Separator vertical size={GAP} />
        <TextInput
          label={TEXT.authentification.password_confirmation}
          onChangeText={(val) => updateEntry("password_confirmation", val)}
          value={entries.password_confirmation}
          secureTextEntry
          autoComplete="password"
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
  );
};

export default GeneralInformationsScreen;
