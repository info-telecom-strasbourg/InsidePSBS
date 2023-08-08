import React from "react";
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
import { useRouter, useSearchParams } from "expo-router";

const GAP = 15;

const GeneralInformationsScreen = ({ entries, updateEntry }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { step } = useSearchParams();
  return (
    <ScrollScreenContainer>
      <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
        <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
          {TEXT.authentification.register.general_information}
        </Text>
        <Separator size={25} vertical />
        <TextInput
          label={TEXT.authentification.email}
          onChangeText={(val) => setEntry("email", val)}
          value={entries.email}
          autoComplete="email"
          placeholder={TEXT.authentification.placeholders.email}
        />
        <Separator vertical size={GAP} />
        <TextInput
          label={TEXT.authentification.password}
          onChangeText={(val) => setEntry("password", val)}
          value={entries.password}
          secureTextEntry
          autoComplete="password"
          placeholder={TEXT.authentification.placeholders.password}
        />
        <Separator vertical size={GAP} />
        <TextInput
          label={TEXT.authentification.password_confirmation}
          onChangeText={(val) => setEntry("password_confirmation", val)}
          value={entries.password_confirmation}
          secureTextEntry
          autoComplete="password"
          placeholder={TEXT.authentification.placeholders.password}
        />
        <Separator size={25} vertical />
        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={() => router.push(`${ROUTES.register}/${Number(step) + 1}`)}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default GeneralInformationsScreen;
