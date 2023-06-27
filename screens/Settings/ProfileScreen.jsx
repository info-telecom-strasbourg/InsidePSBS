import React from "react";
import {
  BackButtonTopbar,
  ColoredButton,
  Loader,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { COLORS, TEXT } from "../../constants";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useAuth, useTheme } from "../../contexts";
import { useFetch } from "../../hooks";
import { Image, Text, View } from "react-native";
import styles from "./settings.style";
import { text_styles } from "../../styles";
import SettingButton from "./SettingButton";

const ProfileScreen = () => {
  const { data } = useLocalStorage();
  const { theme } = useTheme();
  const { logout } = useAuth();

  const { res, isLoading, error } = useFetch(
    "https://app-pprd.its-tps.fr/api/user/me",
    {
      Accept: "application/json",
      Authorization: `Bearer ${data.token}`,
    }
  );

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.profile.title}
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
          </View>
          <View style={styles.section}>
            <SettingButton
              text="Nom d'utilisateur"
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  @{res?.data.user_name}
                </Text>
              }
            />
            <SettingButton
              text="Numéro de téléphone"
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.phone}
                </Text>
              }
            />
            <SettingButton
              text="Filière"
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.sector}
                </Text>
              }
            />
            <SettingButton
              text="Promotion"
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.promotion_year}
                </Text>
              }
            />
            <SettingButton text="Mot de passe" />
            <SettingButton text="Compte Unistra" />
          </View>

          <PrimaryButton
            text="Déconnexion"
            textStyle={{ fontSize: 17 }}
            onPress={() => logout()}
          />
          <View style={{ height: 10 }} />
          <ColoredButton
            foreground={COLORS.dark_red}
            background={COLORS.light_red}
            text="Supprimer le compte"
            textStyle={{ fontSize: 17 }}
          />
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default ProfileScreen;
