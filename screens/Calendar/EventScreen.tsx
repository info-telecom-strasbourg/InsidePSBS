import { ScrollScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import { Body1, Body2, Body3, Title2, Title3 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import FONTS from "constants/fonts";
import { useState } from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getStringDate } from "utils/date/getStringDate";
import hideTextOverflow from "utils/hideTextOverflow";

import { EventType } from "./CalendarTypes";
import { ClockIcon, GpsIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";
import getHour from "../../utils/date/getHour";

const EventScreen = () => {
  const [event, setEvent] = useState<EventType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

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
              <Title2>{hideTextOverflow(event.title, 19)}</Title2>
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
              <Title3 style={{ color: event.color }}>
                {event.author.name}
              </Title3>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <ClockIcon color={theme.text} width={30} height={30} />
              <View>
                <Body1 style={{ fontFamily: FONTS.OpenSans.bold }}>
                  {getStringDate(event.start_at)}
                </Body1>
                <Body3>
                  {getHour(event.start_at)} - {getHour(event.end_at)}
                </Body3>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <GpsIcon color={theme.text} height={30} width={30} />
              <Body2>{event.location}</Body2>
            </View>
          </View>
          <Body3>{event.description}</Body3>
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default EventScreen;
