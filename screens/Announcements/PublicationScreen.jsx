import React, { useState } from "react";
import { BackButtonTopbar, ScrollScreenContainer } from "../../components";
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "./publication.style";
import { API } from "../../constants";
import { text_styles } from "../../styles";
import { getStringDateTime, hideTextOverflow } from "../../utils";
import { HeartBorderIcon, MessagesIcon } from "../../assets/icons";
import { useTheme } from "../../contexts";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";

const PublicationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { id } = useLocalSearchParams();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setRefreshing(false);
  };

  const { data } = useLocalStorage();

  const { res, isLoading, error } = useFetch(`${API.url}/api/post/${id}`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });

  const { theme, colorScheme } = useTheme();

  return (
    <ScrollScreenContainer
      background={theme.box}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <BackButtonTopbar>
        {hideTextOverflow(res?.data.title, 10)}
      </BackButtonTopbar>

      <View
        style={{
          padding: 16,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Image
            source={{ uri: res?.data.author.logo_url }}
            style={styles.image()}
          />
          <View style={{ width: 10 }} />
          <View>
            <Text style={text_styles.title3(theme)}>
              {res?.data.author.name}
            </Text>
            <Text style={text_styles.body3({ text: theme.text_secondary })}>
              {getStringDateTime(res?.data.date)}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={text_styles.title2(theme)}>{res?.data.title}</Text>
        <View style={{ height: 5 }} />
        <Text style={text_styles.body3(theme)}>{res?.data.body}</Text>
        {/* <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <HeartBorderIcon color={theme.text} />
            <View style={{ width: 7 }} />
            <Text style={text_styles.body2(theme)}>
              {res?.data.reactions?.length} likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MessagesIcon color={theme.text} />
            <View style={{ width: 7 }} />
            <Text style={text_styles.body2(theme)}>Commenter</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <Text style={text_styles.body2({ text: theme.text_secondary })}>
          Aucun commentaire
        </Text> */}
      </View>
    </ScrollScreenContainer>
  );
};

export default PublicationScreen;
