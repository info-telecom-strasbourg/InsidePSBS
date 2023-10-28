import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "expo-router";
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ClockIcon, GpsIcon } from "../../assets/icons";
import { DefaultTopbar, Loader, ScrollScreenContainer } from "../../components";
import { API, FONTS, TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { text_styles } from "../../styles";
import { getStringDate, getTimeDifference } from "../../utils";
import createDateFromDDMMYYYY from "../../utils/date/createDateFromDDMMYYYY";
import getHour from "../../utils/date/getHour";
import getColor from "../../utils/getColors";
import WidgetSection from "./widgets/WidgetSection";
import initNotification from "../../utils/initNotification";
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const { data, pushData } = useLocalStorage();
  console.log(data.token);
  useEffect(() => {
    initNotification(data, pushData);
  }, []);

  useEffect(() => {
    console.log(upcomingEvent);
  }, [upcomingEvent]);

  const handleRefresh = async () => {
    const controller = new AbortController();
    setLoading(true);
    await fetchData(controller);
    setLoading(false);
  };

  const fetchData = async (controller) => {
    setLoading(true);

    try {
      const currentDate = new Date();
      const endDate = new Date().setDate(currentDate.getDate() + 30);
      const res = await axios.get(
        `${API.url}/api/event?start_at=${createDateFromDDMMYYYY(
          getStringDate(currentDate)
        )}&end_at=${createDateFromDDMMYYYY(getStringDate(endDate))}&per_page=5`,
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
          signal: controller.signal,
        }
      );
      console.log(res.data.data);
      setUpcomingEvent(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
    >
      <DefaultTopbar>{TEXT.common.app_name}</DefaultTopbar>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ gap: 30 }}>
          <WidgetSection />
          <View style={{ paddingHorizontal: 11, gap: 8 }}>
            <Text style={text_styles.title2(theme)}>A venir</Text>
            {upcomingEvent.length === 0 ? (
              <Text style={text_styles.body1(theme)}>
                Oh oh... Il ne se passe pas grand chose ici !
              </Text>
            ) : (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 11 }}
              >
                {upcomingEvent.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      )}
    </ScrollScreenContainer>
  );
};

const EventCard = ({ event }) => {
  const { backgroundColor, foregroundColor } = getColor(event.color);
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/event/${event.id}`)}
      style={{
        backgroundColor,
        width: 130,
        height: 130,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 7,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: foregroundColor,
          }}
        />
        <Text numberOfLines={2} style={{ fontFamily: FONTS.OpenSans.bold }}>
          {event.title}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text
          style={{
            color: foregroundColor,
            fontFamily: FONTS.OpenSans.semiBold,
          }}
        >
          {getTimeDifference(event.start_at)}
        </Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <ClockIcon width={12} height={12} color={foregroundColor} />
            <Text>
              {getHour(event.start_at)}-{getHour(event.end_at)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                flex: 1,
              }}
            >
              <GpsIcon width={12} height={12} color={foregroundColor} />
              <Text numberOfLines={1}>{event.location}</Text>
            </View>
            <Image
              source={{ uri: event.author.logo_url }}
              width={20}
              height={20}
              style={{ borderRadius: 20 }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeScreen;
