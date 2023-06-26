import React, { useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { Picker, PrimaryButton, TextInput } from "../../../components";
import { TEXT } from "../../../constants";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import {
  checkFirstName,
  checkLastName,
  checkPhone,
  checkUsername,
} from "../../../utils/checkInputs";

const PersonalInformations = ({ nextStep, entries, setEntry }) => {
  const { width, height } = useWindowDimensions();
  const { theme } = useTheme();
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
  });

  const setError = (key, value) => {
    setErrors((e) => ({
      ...e,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    setErrors({
      first_name: "",
      last_name: "",
      user_name: "",
      phone: "",
    });
    if (!checkFirstName(entries.first_name))
      return setError("first_name", TEXT.authentification.errors.empty);
    if (!checkLastName(entries.last_name))
      return setError("last_name", TEXT.authentification.errors.empty);
    if (!checkUsername(entries.user_name))
      return setError("user_name", TEXT.authentification.errors.user_name);
    if (!checkPhone(entries.phone))
      return setError("phone", TEXT.authentification.errors.phone);

    nextStep();
  };

  const sectors = [
    { label: TEXT.authentification.sectors.empty, value: null },
    { label: TEXT.authentification.sectors.gene, value: "Géné" },
    { label: TEXT.authentification.sectors.ir, value: "IR" },
    { label: TEXT.authentification.sectors.ti, value: "TI" },
    { label: TEXT.authentification.sectors.fip, value: "FIP" },
    { label: TEXT.authentification.sectors.bs, value: "BS" },
  ];

  const inputs = [
    <TextInput
      label={TEXT.authentification.first_name}
      onChangeText={(val) => setEntry("first_name", val)}
      value={entries.first_name}
      placeholder="Louis"
      error={errors.first_name}
    />,
    <TextInput
      label={TEXT.authentification.last_name}
      onChangeText={(val) => setEntry("last_name", val)}
      value={entries.last_name}
      placeholder="Royet"
      error={errors.last_name}
    />,
    <TextInput
      placeholder="louis.royet"
      label={TEXT.authentification.user_name}
      onChangeText={(val) => setEntry("user_name", val)}
      value={entries.user_name}
      error={errors.user_name}
    />,
    <TextInput
      placeholder="0666723073"
      label={TEXT.authentification.phone}
      onChangeText={(val) => setEntry("phone", val)}
      value={entries.phone}
      error={errors.phone}
      inputMode="numeric"
    />,
  ];

  const pickers = [
    <TextInput
      placeholder="2059"
      label={TEXT.authentification.promotion_year}
      onChangeText={(val) => setEntry("promotion_year", val)}
      value={entries.promotion_year}
      inputMode="numeric"
    />,
    <Picker
      value={entries.sector}
      onValueChange={(val) => {
        setEntry("sector", val);
      }}
      label={TEXT.authentification.sector}
      items={sectors}
    />,
  ];

  return (
    <View
      style={{
        width,
        marginVertical: 15,
      }}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={text_styles.title2(theme)}>
          {TEXT.authentification.register.personal_informaions}
        </Text>
        <View style={{ height: 20 }} />

        {/* Inputs */}
        {inputs.map((input, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            {input}
          </View>
        ))}

        {/* Pickers */}
        <View style={{ flexDirection: "row" }}>
          {pickers.map((picker, index) => (
            <View key={index} style={{ flex: 1, flexDirection: "row" }}>
              {index !== 0 && <View style={{ width: 15 }} />}
              <View style={{ flex: 1 }}>{picker}</View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />

        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default PersonalInformations;
