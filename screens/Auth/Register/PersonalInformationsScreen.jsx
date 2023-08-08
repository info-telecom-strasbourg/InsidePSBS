import React from "react";
import {
  Picker,
  PrimaryButton,
  ScrollScreenContainer,
  Separator,
  TextInput,
} from "../../../components";
import { Text, View } from "react-native";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { API, ROUTES, TEXT } from "../../../constants";
import { useFetch } from "../../../hooks";
import { useRouter, useSearchParams } from "expo-router";

const GAP = 15;

const PersonalInformationsScreen = ({ entries, updateEntry }) => {
  const { theme } = useTheme();
  const { step } = useSearchParams();
  const router = useRouter();

  const {
    res: sectors,
    isLoading,
    error,
  } = useFetch(`${API.url}/api/sector`, {
    ...API.headers,
  });

  return (
    <ScrollScreenContainer>
      <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
        <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
          {TEXT.authentification.register.personal_information}
        </Text>
        <Separator size={25} vertical />
        <TextInput
          label={TEXT.authentification.first_name}
          placeholder="Louis"
          value={entries.first_name}
          onChangeText={(text) => updateEntry("first_name", text)}
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.last_name}
          placeholder="Royet"
          value={entries.last_name}
          onChangeText={(text) => updateEntry("last_name", text)}
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.user_name}
          placeholder="louis.royet"
          value={entries.user_name}
          onChangeText={(text) => updateEntry("user_name", text)}
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.phone}
          placeholder="0666723073"
          value={entries.phone}
          onChangeText={(text) => updateEntry("phone", text)}
          inputMode="numeric"
        />
        <Separator size={GAP} vertical />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="2059"
              label={TEXT.authentification.promotion_year}
              onChangeText={(val) => updateEntry("promotion_year", val)}
              value={entries.promotion_year}
              inputMode="numeric"
            />
          </View>
          <Separator size={GAP} horizontal />
          <View style={{ flex: 1 }}>
            <Picker
              value={entries.sector}
              onValueChange={(val) => {
                updateEntry("sector", val);
              }}
              label={TEXT.authentification.sector}
              items={sectors?.data}
            />
          </View>
        </View>
        <Separator size={25} vertical />
        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={() => router.push(`${ROUTES.register}/${Number(step) + 1}`)}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default PersonalInformationsScreen;
