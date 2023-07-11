import React, { useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  Picker,
  PrimaryButton,
  ScreenContainer,
  TextInput,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";
import { Text, View } from "react-native";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import axios from "axios";
import {
  checkAlreadyExist,
  checkPhone,
  checkPromotionYear,
  checkUsername,
} from "../../utils";

const ProfileEditScreen = () => {
  const { entry } = useLocalSearchParams();
  const [entryValue, setEntryValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data } = useLocalStorage();
  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  const router = useRouter();

  const { theme } = useTheme();

  const inputs = {
    user_name: (
      <TextInput
        inputMode={"text"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
    phone: (
      <TextInput
        inputMode={"numeric"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
    sector: <SectorPicker onValueChange={setEntryValue} value={entryValue} />,
    promotion_year: (
      <TextInput
        inputMode={"numeric"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
  };

  const check = {
    user_name: async () => {
      if (!checkUsername(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.user_name);
        return false;
      }
      if (!(await checkAlreadyExist(entry, entryValue))) {
        setErrorMessage(TEXT.authentification.errors.user_name_already_used);
        return false;
      }
      return true;
    },

    phone: () => {
      if (!checkPhone(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.phone);
        return false;
      }
      return true;
    },
    sector: () => true,
    promotion_year: () => {
      if (!checkPromotionYear(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.promotion_year);
        return false;
      }
      return true;
    },
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!(await check[entry]())) return;
    const key = entry === "sector" ? "sector_id" : entry;
    try {
      const res = await axios.put(
        `${API.url}/api/user`,
        { [key]: entryValue },
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      router.back();
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
      </BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={text_styles.title2(theme)}>{TEXT.profile[entry]}</Text>
          {inputs[entry]}
          <View height={25} />
          <PrimaryButton
            text={TEXT.profile.edit_profile}
            onPress={handleSubmit}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const SectorPicker = ({ value, onValueChange }) => {
  const { res, isLoading, error } = useFetch(`${API.url}/api/sector`, {
    ...API.headers,
  });

  if (isLoading) return;

  return (
    <Picker value={value} onValueChange={onValueChange} items={res?.data} />
  );
};

export default ProfileEditScreen;
