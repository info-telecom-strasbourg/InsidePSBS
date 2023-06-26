import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { PrimaryButton, TextInput } from "../../../components";
import { COLORS, TEXT } from "../../../constants";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { useRouter } from "expo-router";
import {
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
} from "../../../utils";

const GeneralInformations = ({ nextStep, entries, setEntry }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

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

  const handleSubmit = () => {
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
    nextStep();
  };

  const inputs = [
    <TextInput
      label={TEXT.authentification.email}
      onChangeText={(val) => setEntry("email", val)}
      value={entries.email}
      error={errors.email}
      autoComplete="email"
      placeholder={TEXT.authentification.placeholders.email}
    />,
    <TextInput
      label={TEXT.authentification.password}
      onChangeText={(val) => setEntry("password", val)}
      value={entries.password}
      error={errors.password}
      secureTextEntry
      autoComplete="password"
      placeholder={TEXT.authentification.placeholders.password}
    />,
    <TextInput
      label={TEXT.authentification.password_confirmation}
      onChangeText={(val) => setEntry("password_confirmation", val)}
      value={entries.password_confirmation}
      error={errors.password_confirmation}
      secureTextEntry
      autoComplete="password"
      placeholder={TEXT.authentification.placeholders.password}
    />,
  ];

  return (
    <View
      style={{
        width,
        marginVertical: 15,
      }}
    >
      {/* Inputs*/}
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        {inputs.map((input, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            {input}
          </View>
        ))}

        <View style={{ height: 5 }} />

        {/* Already connected */}
        <View style={{ flexDirection: "row" }}>
          <Text style={text_styles.body3(theme)}>
            {TEXT.authentification.register.already_registered}
          </Text>
          <View style={{ width: 5 }} />
          <TouchableOpacity onPress={() => router.push("login")}>
            <Text style={text_styles.body3({ text: COLORS.primary })}>
              {TEXT.authentification.login.title}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />

        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={nextStep}
        />
      </ScrollView>
    </View>
  );
};

export default GeneralInformations;
