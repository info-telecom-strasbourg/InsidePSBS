import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarIcon, ClockIcon, GpsIcon } from "../../assets/icons";
import { COLORS, FONTS } from "../../constants";
import calendar from "../../constants/text/calendar";
import getColor from "../../utils/getColors";
import getHour from "../../utils/date/getHour";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";
import { useRouter } from "expo-router";

const EventList = ({ data }) => {
  const { theme } = useTheme();
  if (!data || data.length === 0)
    return (
      <View style={{ paddingHorizontal: 11, paddingVertical: 20 }}>
        <Text style={text_styles.title3(theme)}>
          Pas d'évènement aujourd'hui 😢
        </Text>
      </View>
    );
  return (
    <View style={{ paddingHorizontal: 11, paddingVertical: 20, gap: 20 }}>
      {data.map((event) => {
        return (
          <Event
            key={event.id}
            index={event.id}
            author={event.author}
            title={event.title}
            start_at={event.start_at}
            end_at={event.end_at}
            description={event.description}
            location={event.location}
            color={event.color}
          />
        );
      })}
    </View>
  );
};

const Event = ({
  author,
  title,
  start_at,
  end_at,
  description,
  location,
  color,
  index,
}) => {
  const { backgroundColor, foregroundColor } = getColor(color);
  const router = useRouter();

  const styles = StyleSheet.create({
    bottomIconContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      flex: 1,
    },

    bottomIconLabel: {
      color: COLORS.black,
      fontSize: 14,
      fontFamily: FONTS.OpenSans.medium,
    },

    hourLabel: {
      color: backgroundColor,
      fontFamily: FONTS.OpenSans.semiBold,
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
      onPress={() => router.push(`/event/${index}`)}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.hourLabel}>{getHour(start_at)}</Text>
        <ClockIcon width={26} height={26} color={backgroundColor} />
        <Text style={styles.hourLabel}>{getHour(end_at)}</Text>
      </View>
      <View
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 15,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={{ uri: author.logo_url }} width={80} height={80} />
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                color: COLORS.black,
                fontSize: 20,
                fontFamily: FONTS.OpenSans.bold,
              }}
            >
              {title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontFamily: FONTS.OpenSans.regular,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.bottomIconContainer}>
            <CalendarIcon width={16} height={17} color={foregroundColor} />
            <Text numberOfLines={1} style={styles.bottomIconLabel}>
              {calendar.day_short[(new Date(start_at).getDay() + 6) % 7]}{" "}
              {new Date(start_at).getDate()}{" "}
              {calendar.month[new Date(start_at).getMonth()]}
            </Text>
          </View>
          <View style={styles.bottomIconContainer}>
            <GpsIcon width={13} height={17} color={foregroundColor} />
            <Text numberOfLines={1} style={styles.bottomIconLabel}>
              {location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventList;
