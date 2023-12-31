import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

import {
    BackButtonTopbar,
    PrimaryButton,
    ScreenContainer,
    TextInput,
} from "../../components";
import { API, ROUTES, TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { text_styles } from "../../styles";
import { checkPassword, checkPasswordConfirmation } from "../../utils";

const ProfileEditPassword = () => {
  const [entries, setEntries] = useState({
    former_password: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    former_password: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();
  const { data } = useLocalStorage();

  const setEntry = (key, value) => {
    setEntries((i) => ({ ...i, [key]: value }));
  };

  const setError = (key, value) => {
    setErrors((i) => ({ ...i, [key]: value }));
  };

  const handleSubmit = async () => {
        setErrors({
            former_password: "",
            password: "",
            password_confirmation: "",
        });
        if (!checkPassword(entries.password))
            return setError("password", TEXT.authentification.errors.password);
        if (
            !checkPasswordConfirmation(
                entries.password,
                entries.password_confirmation,
            )
        )
            return setError(
                "password_confirmation",
                TEXT.authentification.errors.password_confirmation,
            );
        try {
            const res = await axios.put(`${API.url}/api/update-password`, entries, {
                headers: {
                    ...API.headers,
                    Authorization: `Bearer ${data.token}`,
                },
            });
            router.replace(ROUTES.profile);
        } catch (e) {
            if (e.response.status === 422)
                setError(
                    "former_password",
                    TEXT.authentification.errors.former_password,
                );
            console.log(e.response.status);
    }
    };
  const { theme } = useTheme();
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
      </BackButtonTopbar>
      <View style={{ padding: 20 }}>
        <Text style={text_styles.title2(theme)}>{TEXT.profile.password}</Text>
        <View height={25} />
        <TextInput
          inputMode="text"
          value={entries.former_password}
          onChangeText={(v) => setEntry("former_password", v)}
          label={TEXT.profile.former_password}
          placeholder="********"
          error={errors.former_password}
          secureTextEntry
        />
        <View height={10} />
        <TextInput
          inputMode="text"
          value={entries.password}
          onChangeText={(v) => setEntry("password", v)}
          label={TEXT.profile.password}
          placeholder="********"
          error={errors.password}
          secureTextEntry
        />
        <View height={10} />
        <TextInput
          inputMode="text"
          value={entries.password_confirmation}
          onChangeText={(v) => setEntry("password_confirmation", v)}
          label={TEXT.profile.password_confirmation}
          placeholder="********"
          error={errors.password_confirmation}
          secureTextEntry
        />
        <View height={25} />
        <PrimaryButton
          text={TEXT.profile.edit_profile}
          onPress={handleSubmit}
        />
      </View>
    </ScreenContainer>
  );
};

export default ProfileEditPassword;
