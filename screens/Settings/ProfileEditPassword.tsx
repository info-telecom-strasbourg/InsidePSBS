import { PrimaryButton } from "components/Button";
import { TextInput } from "components/Inputs";
import Separator from "components/Separator";
import { Title2 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ScreenContainer } from "components/Containers";
import { checkPassword, checkPasswordConfirmation } from "utils/checkInputs";

import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

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
    // try {
    //   const res = await axios.put(`${API.url}/api/update-password`, entries, {
    //     headers: {
    //       ...API.headers,
    //       Authorization: `Bearer ${data.token}`,
    //     },
    //   });
    //   router.replace(ROUTES.profile);
    // } catch (e) {
    //   if (e.response.status === 422)
    //     setError(
    //       "former_password",
    //       TEXT.authentification.errors.former_password,
    //     );
    //   console.log(e.response.status);
    // }
  };
  const { theme } = useTheme();
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
      </BackButtonTopbar>
      <View style={{ padding: 20 }}>
        <Title2>{TEXT.profile.password}</Title2>
        <Separator size={25} />
        <TextInput
          inputMode="text"
          value={entries.former_password}
          onChangeText={(v) => setEntry("former_password", v)}
          label={TEXT.profile.former_password}
          placeholder="********"
          error={errors.former_password}
          secureTextEntry
        />
        <Separator size={10} />
        <TextInput
          inputMode="text"
          value={entries.password}
          onChangeText={(v) => setEntry("password", v)}
          label={TEXT.profile.password}
          placeholder="********"
          error={errors.password}
          secureTextEntry
        />
        <Separator size={10} />
        <TextInput
          inputMode="text"
          value={entries.password_confirmation}
          onChangeText={(v) => setEntry("password_confirmation", v)}
          label={TEXT.profile.password_confirmation}
          placeholder="********"
          error={errors.password_confirmation}
          secureTextEntry
        />
        <Separator size={25} />
        <PrimaryButton
          text={TEXT.profile.edit_profile}
          onPress={handleSubmit}
        />
      </View>
    </ScreenContainer>
  );
};

export default ProfileEditPassword;
