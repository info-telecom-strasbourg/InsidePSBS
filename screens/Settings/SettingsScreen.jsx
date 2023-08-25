import React, { useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  PrimaryButton,
  ScrollScreenContainer,
} from "../../components";
import { API, ROUTES, TEXT, COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import styles from "./settings.style";
import { text_styles } from "../../styles";
import { useRouter } from "expo-router";
import SettingSwitch from "./SettingSwitch";
import SettingButton from "./SettingButton";
import uriToBlob from "../../utils/uriToBlob";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const SettingsScreen = () => {
  const { data } = useLocalStorage();
  const { theme } = useTheme();
  const router = useRouter();
  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });

  const handleImagePress = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        uriToBlob(result.assets[0].uri).then(async (blob) => {
          console.log(blob);
          await axios.put(
            `${API.url}/api/user`,
            { avatar: blob },
            {
              headers: {
                ...API.headers,
                Authorization: `Bearer ${data.token}`,
              },
            }
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

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
            <TouchableOpacity>
              {/* onPress={handleImagePress} */}
              <Image
                source={{ uri: res?.data.avatar_url }}
                style={{ height: 80, width: 80 }}
              />
            </TouchableOpacity>
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
          ></View>

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
