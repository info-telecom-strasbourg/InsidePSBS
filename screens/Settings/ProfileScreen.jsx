import React from "react";
import {
  BackButtonTopbar,
  ColoredButton,
  Loader,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { API, COLORS, ROUTES, TEXT } from "../../constants";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useAuth, useTheme } from "../../contexts";
import { useFetch } from "../../hooks";
import { Image, Text, View } from "react-native";
import styles from "./settings.style";
import { text_styles } from "../../styles";
import SettingButton from "./SettingButton";
import axios from "axios";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { data, removeData } = useLocalStorage();
  const { theme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
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
              text={TEXT.profile.user_name}
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  @{res?.data.user_name}
                </Text>
              }
              onPress={() => router.push(`${ROUTES.profile}/user_name`)}
            />
            <SettingButton
              text={TEXT.profile.phone}
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.phone}
                </Text>
              }
              onPress={() => router.push(`${ROUTES.profile}/phone`)}
            />
            <SettingButton
              text={TEXT.profile.sector}
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.sector}
                </Text>
              }
              onPress={() => router.push(`${ROUTES.profile}/sector`)}
            />
            <SettingButton
              text={TEXT.profile.promotion_year}
              rightIcon={
                <Text style={text_styles.body3({ text: theme.text_secondary })}>
                  {res?.data.promotion_year}
                </Text>
              }
              onPress={() => router.push(`${ROUTES.profile}/promotion_year`)}
            />
            <SettingButton
              text={TEXT.profile.password}
              onPress={() => router.push(`${ROUTES.profile}/password`)}
            />
            {/* TODO: implement unistra */}
            {/* <SettingButton
              text={TEXT.profile.unistra}
              onPress={() => router.push(`${ROUTES.profile}/unistra`)}
            /> */}
          </View>

          <PrimaryButton
            text={TEXT.profile.disconnect}
            textStyle={{ fontSize: 17 }}
            onPress={() => {
              logout();
            }}
          />
          <View style={{ height: 10 }} />
          <ColoredButton
            foreground={COLORS.dark_red}
            background={COLORS.light_red}
            text={TEXT.profile.delete_account}
            textStyle={{ fontSize: 17 }}
            onPress={async () => {
              try {
                await removeData("token");
                const res = await axios.delete(`${API.url}/api/user`, {
                  headers: {
                    ...API.headers,
                    Authorization: `Bearer ${data.token}`,
                  },
                });
                router.replace(ROUTES.auth);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default ProfileScreen;
