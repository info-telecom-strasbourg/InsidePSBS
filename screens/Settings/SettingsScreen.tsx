import { PrimaryButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { Picker, PickerItem } from "components/Inputs";
import { Body2, Title3, Title4 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";

import Avatar from "./Avatar";
import SettingButton from "./SettingButton";
import styles from "./settings.style";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

type ThemeType = PickerItem & {
  id: "light" | "dark" | "classic" | "auto" | "gold";
  name: string;
};

const SettingsScreen = () => {
  const { data, pushData } = useLocalStorage();
  const { theme, setColorScheme } = useTheme();
  const router = useRouter();
  // const { res, isLoading } = useFetch(`${API.url}/api/user/me`, {
  //   ...API.headers,
  //   Authorization: `Bearer ${data.token}`,
  // });

  // const url = `${API.url}/api/fouaille?per_page=1`;
  // const headers = {
  //   ...API.headers,
  //   Authorization: `Bearer ${data.token}`,
  // };

  // const { res: fouailleRes } = useFetch(url, headers);

  const [themeList, setThemeList] = useState<ThemeType[]>([
    {
      id: "light",
      name: "⚪ Thème clair",
      short_name: "⚪ Thème clair",
    },
    {
      id: "dark",
      name: "⚫ Thème sombre",
      short_name: "⚫ Thème sombre (OLED)",
    },
    {
      id: "classic",
      name: "🔵 Thème classique",
      short_name: "🔵 Thème classique",
    },
    {
      id: "auto",
      name: "⚫⚪ Thème automatique",
      short_name: "⚫⚪ Thème automatique",
    },
  ]);

  // useEffect(() => {
  //   if (parseInt(fouailleRes?.data?.balance) >= 100)
  //     setThemeList([
  //       {
  //         id: "light",
  //         name: "⚪ Thème clair",
  //         short_name: "⚪ Thème clair",
  //       },
  //       {
  //         id: "dark",
  //         name: "⚫ Thème sombre",
  //         short_name: "⚫ Thème sombre (OLED)",
  //       },
  //       {
  //         id: "classic",
  //         name: "🔵 Thème classique",
  //         short_name: "🔵 Thème classique",
  //       },
  //       {
  //         id: "auto",
  //         name: "⚫⚪ Thème automatique",
  //         short_name: "⚫⚪ Thème automatique",
  //       },
  //       {
  //         id: "gold",
  //         name: "🟡 Thème gold",
  //         short_name: "🟡 Thème gold",
  //       },
  //     ]);
  // }, [fouailleRes]);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => router.push(ROUTES.profile)}>
          <Avatar
          //  url={res?.data.avatar_url}
          />
          <Title3>{/* {res?.data.first_name} {res?.data.last_name} */}</Title3>
          <Body2 style={{ color: theme.text_secondary }}>
            {/* @{res?.data.user_name} */}
          </Body2>
          <View style={{ height: 15 }} />
          <PrimaryButton
            text={TEXT.settings.edit_profile}
            style={{ paddingHorizontal: 25 }}
            textStyle={{ fontSize: 15 }}
            onPress={() => router.push(ROUTES.profile)}
          />
        </TouchableOpacity>
        <View style={{ height: 15 }} />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        {/* 
          <Text style={text_styles.title4(theme)}>
            {TEXT.settings.preferences.title}
          </Text> */}
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

        <View style={{ height: 15 }} />

        <Picker
          // value={data.theme}
          onValueChange={(val) => {
            // console.log("val", val);
            // AsyncStorage.setItem("theme", val);
            // setColorScheme(val);
            // pushData({ ...data, theme: val });
          }}
          label={TEXT.settings.preferences.color}
          items={themeList}
        />
        <View style={styles.section} />
        <View style={{ height: 15 }} />

        <Title4>{TEXT.settings.about.title}</Title4>
        <View style={styles.section}>
          <SettingButton
            text="Nous contacter"
            onPress={() => {
              Linking.openURL("mailto:info.telecom.strasbourg@gmail.com"); //temporary must be changed for its email
            }}
          />
          <SettingButton
            text="Conditions d'utilisation"
            onPress={() => router.push(ROUTES.cgu)}
          />
          <SettingButton
            text="Crédits"
            onPress={() => router.push(ROUTES.credits)}
          />
        </View>
      </View>
      {/* )} */}
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
