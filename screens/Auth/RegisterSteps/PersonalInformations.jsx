import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { PrimaryButton, TextInput } from "../../../components";
import { TEXT } from "../../../constants";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";

const PersonalInformations = ({ nextStep }) => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  return (
    <View
      style={{
        width,
        padding: 15,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={text_styles.title2(theme)}>
          {TEXT.authentification.register.personal_informaions}
        </Text>
        <View style={{ height: 30 }} />
        <TextInput label={TEXT.authentification.first_name} />
        <View style={{ height: 15 }} />
        <TextInput label={TEXT.authentification.last_name} />
        <View style={{ height: 15 }} />
        <TextInput label={TEXT.authentification.username} />
        <View style={{ height: 15 }} />
        <TextInput label={TEXT.authentification.phone} />
        <View style={{ height: 15 }} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput label={TEXT.authentification.year} />
          </View>
          <View style={{ width: 15 }} />
          <View style={{ flex: 1 }}>
            <TextInput label={TEXT.authentification.sector} />
          </View>
        </View>
      </View>
      <View style={{ height: 20 }} />
      <PrimaryButton
        text={TEXT.authentification.register.next}
        onPress={nextStep}
      />
    </View>
  );
};

export default PersonalInformations;
