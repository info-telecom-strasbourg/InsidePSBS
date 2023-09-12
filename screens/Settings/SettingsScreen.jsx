import React, { useEffect, useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  PrimaryButton,
  ScrollScreenContainer,
  Picker,
} from "../../components";
import { API, ROUTES, TEXT, COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { Image, Text, View, TouchableOpacity, Linking } from "react-native";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import styles from "./settings.style";
import { text_styles } from "../../styles";
import { useRouter } from "expo-router";
import SettingSwitch from "./SettingSwitch";
import SettingButton from "./SettingButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingsScreen = () => {
  const { data, pushData } = useLocalStorage();
  const { theme, setColorScheme } = useTheme();
  const router = useRouter();
  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  useEffect(() => {
    console.log("avatar url :", res?.data.avatar_url);
  }, [res]);

  const handleImagePress = async () => {
    const sizeTarget = 320;
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(data.token);

    if (!result.canceled) {
      try {
        const manipResult = await manipulateAsync(
          result.assets[0].uri,
          [
            {
              resize: {
                height: sizeTarget,
                width: sizeTarget,
              },
            },
          ],
          { compress: 0, format: SaveFormat.JPEG }
        );
        console.log(typeof manipResult);
        axios
          .put(
            `${API.url}/api/user`,
            { avatar: manipResult },
            {
              headers: {
                ...API.headers,
                Authorization: `Bearer ${data.token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log("sent");
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
            <TouchableOpacity onPress={handleImagePress}>
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
            value={data.theme}
            onValueChange={(val) => {
              console.log("val", val);
              AsyncStorage.setItem("theme", val);
              setColorScheme(val);
              pushData({ ...data, theme: val });
            }}
            label={TEXT.settings.preferences.color}
            items={[
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
            ]}
          />
          <View style={styles.section}></View>
          <View style={{ height: 15 }} />

          <Text style={text_styles.title4(theme)}>
            {TEXT.settings.about.title}
          </Text>
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
      )}
    </ScrollScreenContainer>
  );
};

export default SettingsScreen;
