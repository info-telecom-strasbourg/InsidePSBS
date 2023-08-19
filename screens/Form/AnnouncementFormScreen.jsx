import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  ScrollScreenContainer,
  BackButtonTopbar,
  PrimaryButton,
  TextInput,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import axios from "axios";

const AnnouncementFormScreen = () => {
  const [error, setError] = useState("");
  const [result, setResult] = useState({
    title: "",
    body: "",
    color: "#ffffff",
  });
  const { data } = useLocalStorage();

  const handleSubmit = async (entries) => {
    console.log(data.token);
    //check the content of the field to verify not too long
    try {
      const res = await axios
        .post(`${API.url}/api/post`, entries, {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            router.replace(ROUTES.announcements);
          } else {
            setError(TEXT.form.error);
            console.log(res);
          }
        });
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setError(TEXT.form.errorFields);
      }
      return;
    }
  };
  const { theme } = useTheme();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.form.announcements.title}
      </BackButtonTopbar>
      <View style={{ height: 15 }} />
      <Text style={{ color: "orange" }}>{error}</Text>
      <View style={{ padding: 15 }}>
        <TextInput
          value={result.title}
          onChangeText={(val) => setResult((prev) => ({ ...prev, title: val }))}
          label={TEXT.form.announcements.messageTitle}
          multiline={true}
          numberOfLines={1}
          style={{
            maxHeight: 100,
          }}
          maxLength={50}
        />
        <View style={{ height: 25 }} />
        <TextInput
          value={result.body}
          onChangeText={(val) => setResult((prev) => ({ ...prev, body: val }))}
          label={TEXT.form.announcements.messageContent}
          multiline={true}
          numberOfLines={1}
          style={{ height: 300, textAlignVertical: "top" }}
          maxLength={4000000000}
        />
        <View style={{ height: 25 }} />
        <PrimaryButton
          text="Envoyer mon annonce"
          onPress={() => handleSubmit(result)}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default AnnouncementFormScreen;
