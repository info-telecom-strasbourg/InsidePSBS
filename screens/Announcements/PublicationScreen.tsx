import { ScrollScreenContainer } from "components/Containers";
import { Body3, Title2, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import API from "constants/api";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getStringDateTime } from "utils/date/getStringDate";
import hideTextOverflow from "utils/hideTextOverflow";

import styles from "./publication.style";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

const PublicationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { id } = useLocalSearchParams();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setRefreshing(false);
  };

  const { data } = useLocalStorage();

  const { res, isLoading, error } = { res: null, isLoading: null, error: null };

  const { theme, colorScheme } = useTheme();

  return (
    <ScrollScreenContainer
      style={{ backgroundColor: theme.box }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <BackButtonTopbar>
        {hideTextOverflow(res?.data.title, 10)}
      </BackButtonTopbar>

      <View
        style={{
          padding: 16,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
          }}>
          <Image
            source={{ uri: res?.data.author.logo_url }}
            style={styles.image()}
          />
          <View style={{ width: 10 }} />
          <View>
            <Title3>{res?.data.author.name}</Title3>
            <Body3 style={{ color: theme.text_secondary }}>
              {getStringDateTime(res?.data.date)}
            </Body3>
          </View>
        </TouchableOpacity>

        <Title2>{res?.data.title}</Title2>
        <View style={{ height: 5 }} />
        <Body3>{res?.data.body}</Body3>
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
