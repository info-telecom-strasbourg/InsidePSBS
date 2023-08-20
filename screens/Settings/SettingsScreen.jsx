import React from "react";
import {
  BackButtonTopbar,
  Loader,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { API, ROUTES, TEXT, COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { Image, Text, View } from "react-native";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import styles from "./settings.style";
import { text_styles } from "../../styles";
import { useRouter } from "expo-router";
import SettingSwitch from "./SettingSwitch";
import SettingButton from "./SettingButton";
import { Step1, Step2, Step3, Step4 } from "../../assets/icons";
const SettingsScreen = () => {
  const { data } = useLocalStorage();
  const { theme } = useTheme();
  const router = useRouter();
  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  console.log(theme);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Image
              source={{ uri: res?.data.avatar_url }}
              style={{ height: 80, width: 80 }}
            />
            <Text style={text_styles.title3(theme)}>
              {res?.data.first_name} {res?.data.last_name}
            </Text>
            <Text style={text_styles.body2({ text: theme.text_secondary })}>
              @{res?.data.user_name}
            </Text>
            <View style={{ height: 15 }} />
            <PrimaryButton
              text={TEXT.settings.edit_profile}
              style={{ paddingHorizontal: 25 }}
              textStyle={{ fontSize: 15 }}
              onPress={() => router.push(ROUTES.profile)}
            />
          </View>
          <View style={{ height: 15 }} />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Step1
              TextColor={theme.text}
              DarkBackgroundColor={theme.box}
              AccentColor={COLORS.dark_orange}
            />
            <Step2
              TextColor={theme.text}
              DarkBackgroundColor={theme.box}
              AccentColor={COLORS.dark_orange}
            />
            <Step3
              TextColor={theme.text}
              DarkBackgroundColor={theme.box}
              AccentColor={COLORS.dark_orange}
            />
            <Step4 TextColor={theme.text} AccentColor={COLORS.dark_orange} />
          </View>

          {/* TODO: implement notifications and preferences
          <Text style={text_styles.title4(theme)}>
            {TEXT.settings.notifications.title}
          </Text>
          <View style={styles.section}>
            <SettingSwitch text="Rappel abonnement CTS" />
            <SettingSwitch text="Notification BDE" />
            <SettingSwitch text="Alerte dernier Tram" />
            <SettingSwitch text="Nouvelles photos MPS" />
            <SettingSwitch text="Carte fouaille vide" />
            <SettingSwitch text="Plafond de dépense atteint" />
          </View>  */}

          {/* <View style={{ height: 15 }} />

          <Text style={text_styles.title4(theme)}>
            {TEXT.settings.preferences.title}
          </Text>
          <View style={styles.section}></View>

          <View style={{ height: 15 }} />

          <Text style={text_styles.title4(theme)}>
            {TEXT.settings.about.title}
          </Text>
          <View style={styles.section}>
            <SettingButton text="Nous contacter" />
            <SettingButton text="Conditions d'utilisation" />
            <SettingButton text="Crédits" />
          </View> */}
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
