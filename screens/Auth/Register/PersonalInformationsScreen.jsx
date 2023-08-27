import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  Picker,
  PrimaryButton,
  ScrollScreenContainer,
  Separator,
  TextInput,
} from "../../../components";
import { API, ROUTES, TEXT, COLORS } from "../../../constants";
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
  checkBirthDate,
  checkUsername,
} from "../../../utils";
import { Step2 } from "../../../assets/icons";
import createDataFromDDMMYYYY from "../../../utils/date/createDateFromDDMMYYYY";

const GAP = 15;

const PersonalInformationsScreen = () => {
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    phone: "",
    birth_date: "",
  });
  const setError = (key, value) => {
    setErrors((e) => ({
      ...e,
      [key]: value,
    }));
  };

  const { entries, updateEntry } = useRegister();
  const { theme } = useTheme();
  const { step } = useLocalSearchParams();
  const [Date, setDate] = useState("");

  const router = useRouter();
  const {
    res: sectors,
    isLoading,
    error,
  } = useFetch(`${API.url}/api/sector`, {
    ...API.headers,
  });

  const handleDateChange = (date) => {
    date = date.replace(/\D/g, "");
    if (2 <= date.length && date.length < 4) {
      date = date.slice(0, 2) + "/" + date.slice(2, 4);
    } else if (4 <= date.length) {
      date = date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 8);
    }
    return date;
  };
  const handleSubmit = async () => {
    setErrors({
      first_name: "",
      last_name: "",
      user_name: "",
      phone: "",
      birth_date: "",
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
    if (!checkBirthDate(entries.birth_date)) {
      return setError("birth_date", TEXT.authentification.errors.birth_date);
    }
    if (!(await checkAlreadyExist("user_name", entries.user_name)))
      return setError(
        "user_name",
        TEXT.authentification.errors.user_name_already_used
      );
    if (!(await checkAlreadyExist("phone", entries.phone)))
      return setError("phone", TEXT.authentification.errors.phone_already_used);

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
          <Step2
            TextColor={theme.text}
            DarkBackgroundColor={theme.box}
            AccentColor={COLORS.dark_orange}
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
          <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
            {TEXT.authentification.register.personal_information}
          </Text>
          <Separator size={25} vertical />
          <TextInput
            label={TEXT.authentification.first_name}
            placeholder={TEXT.authentification.placeholders.first_name}
            value={entries.first_name}
            onChangeText={(text) => updateEntry("first_name", text)}
            error={errors.first_name}
          />
          <Separator size={GAP} vertical />
          <TextInput
            label={TEXT.authentification.last_name}
            placeholder={TEXT.authentification.placeholders.last_name}
            value={entries.last_name}
            onChangeText={(text) => updateEntry("last_name", text)}
            error={errors.last_name}
          />
          <Separator size={GAP} vertical />
          <TextInput
            label={TEXT.authentification.user_name}
            placeholder={TEXT.authentification.placeholders.user_name}
            value={entries.user_name}
            onChangeText={(text) => updateEntry("user_name", text)}
            error={errors.user_name}
            autoCapitalize="none"
          />
          <Separator size={GAP} vertical />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <TextInput
                label={TEXT.authentification.phone}
                placeholder={TEXT.authentification.placeholders.phone}
                value={entries.phone}
                onChangeText={(text) => updateEntry("phone", text)}
                inputMode="numeric"
                error={errors.phone}
              />
            </View>
            <Separator size={GAP} horizontal />
            <View style={{ flex: 2 }}>
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

          <Separator size={GAP} vertical />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder={TEXT.authentification.placeholders.promotion_year}
                label={TEXT.authentification.promotion_year}
                onChangeText={(val) => updateEntry("promotion_year", val)}
                value={entries.promotion_year}
                inputMode="numeric"
              />
            </View>
            <Separator size={GAP} horizontal />
            <View style={{ flex: 1 }}>
              <TextInput
                label={TEXT.authentification.birth_date}
                placeholder={TEXT.authentification.placeholders.birth_date}
                value={Date}
                onChangeText={(text) => {
                  var date = handleDateChange(text);
                  setDate(date);

                  var date = createDataFromDDMMYYYY(date);
                  updateEntry("birth_date", date);
                }}
                inputMode="numeric"
                error={errors.birth_date}
              />
            </View>
          </View>
        </View>
        <Separator size={25} vertical />
        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={handleSubmit}
        />
        <Separator size={25} vertical />
      </ScrollScreenContainer>
    </SafeAreaView>
  );
};

export default PersonalInformationsScreen;
