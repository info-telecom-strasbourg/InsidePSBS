import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  Picker,
  PrimaryButton,
  ScrollScreenContainer,
  Separator,
  TextInput,
} from "../../../components";
import { API, ROUTES, TEXT } from "../../../constants";
import { useTheme } from "../../../contexts";
import { useRegister } from "../../../contexts/registerContext";
import { useFetch } from "../../../hooks";
import { text_styles } from "../../../styles";
import {
  checkAlreadyExist,
  checkFirstName,
  checkLastName,
  checkPhone,
  checkPromotionYear,
  checkUsername,
} from "../../../utils";

const GAP = 15;

const PersonalInformationsScreen = () => {
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

  const { entries, updateEntry } = useRegister();
  console.log(entries);
  const { theme } = useTheme();
  const { step } = useLocalSearchParams();
  const router = useRouter();
  const {
    res: sectors,
    isLoading,
    error,
  } = useFetch(`${API.url}/api/sector`, {
    ...API.headers,
  });

  const handleSubmit = async () => {
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
    if (!checkPromotionYear(entries.promotion_year))
      return setError(
        "promotion_year",
        TEXT.authentification.errors.promotion_year
      );
    if (!(await checkAlreadyExist("user_name", entries.user_name)))
      return setError(
        "user_name",
        TEXT.authentification.errors.user_name_already_used
      );

    router.push(`${ROUTES.register}/${Number(step) + 1}`);
  };

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
          error={errors.first_name}
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.last_name}
          placeholder="Royet"
          value={entries.last_name}
          onChangeText={(text) => updateEntry("last_name", text)}
          error={errors.last_name}
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.user_name}
          placeholder="louis.royet"
          value={entries.user_name}
          onChangeText={(text) => updateEntry("user_name", text)}
          error={errors.user_name}
          autoCapitalize="none"
        />
        <Separator size={GAP} vertical />
        <TextInput
          label={TEXT.authentification.phone}
          placeholder="0666723073"
          value={entries.phone}
          onChangeText={(text) => updateEntry("phone", text)}
          inputMode="numeric"
          error={errors.phone}
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
          onPress={handleSubmit}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default PersonalInformationsScreen;
