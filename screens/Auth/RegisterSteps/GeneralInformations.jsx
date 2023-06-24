import React from "react";
import {
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

const GeneralInformations = ({ nextStep }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width,
        padding: 15,
        justifyContent: "space-between",
      }}
    >
      <View>
        <TextInput label={TEXT.authentification.email} />
        <View style={{ height: 15 }} />
        <TextInput label={TEXT.authentification.password} />
        <View style={{ height: 15 }} />
        <TextInput label={TEXT.authentification.password_confirm} />
        <View style={{ height: 20 }} />
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
      </View>
      <View>
        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={nextStep}
        />
      </View>
    </View>
  );
};

export default GeneralInformations;
