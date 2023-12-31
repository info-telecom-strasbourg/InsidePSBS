import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ClockIcon, GpsIcon } from "../../assets/icons";
import {
    BackButtonTopbar,
    Loader,
    ScrollScreenContainer,
} from "../../components";
import { API, COLORS, FONTS } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { text_styles } from "../../styles";
import { getStringDate, hideTextOverflow } from "../../utils";
import getHour from "../../utils/date/getHour";

const EventScreen = () => {
  const { id } = useLocalSearchParams();
  const { data } = useLocalStorage();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API.url}/api/event/${id}`, {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${data.token}`,
        },
      });
      setEvent(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(event?.author?.logo_url);

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>
        {hideTextOverflow(event?.author?.short_name || event?.author?.name, 10)}
      </BackButtonTopbar>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ gap: 30, paddingHorizontal: 11 }}>
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: event.color,
                  borderRadius: 15,
                }}
              />
              <Text style={text_styles.title2(theme)}>
                {hideTextOverflow(event.title, 19)}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                source={{ uri: event.author.logo_url }}
                alt={`${event.author.name}`}
                width={50}
                height={50}
                style={{ borderRadius: 50 }}
              />
              <Text style={text_styles.title3({ text: event.color })}>
                {event.author.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <ClockIcon color={theme.text} width={30} height={30} />
              <View>
                <Text
                  style={{
                    ...text_styles.body1(theme),
                    fontFamily: FONTS.OpenSans.bold,
                  }}>
                  {getStringDate(event.start_at)}
                </Text>
                <Text style={text_styles.body3(theme)}>
                  {getHour(event.start_at)} - {getHour(event.end_at)}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <GpsIcon color={theme.text} height={30} width={30} />
              <Text
                style={{
                  ...text_styles.body2(theme),
                }}>
                {event.location}
              </Text>
            </View>
          </View>
          <Text style={text_styles.body3(theme)}>{event.description}</Text>
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default EventScreen;
