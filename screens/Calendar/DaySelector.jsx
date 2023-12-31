import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import calendarStyle from "./calendar.style";
import { COLORS } from "../../constants";
import calendar from "../../constants/text/calendar";
import { useTheme } from "../../contexts";
import compareDay from "../../utils/date/compareDay";
import getWeek from "../../utils/date/getWeek";

const DaySelector = ({ selectedDay, setSelectedDay, changeScreenTitle }) => {
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const [displayedWeeks, setDisplayedWeeks] = useState([
    getWeek(selectedDay.getTime() - 7 * 1000 * 3600 * 24),
    getWeek(selectedDay.getTime()),
    getWeek(selectedDay.getTime() + 7 * 1000 * 3600 * 24),
  ]);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    setDisplayedWeeks([
      getWeek(selectedDay.getTime() - 7 * 1000 * 3600 * 24),
      getWeek(selectedDay.getTime()),
      getWeek(selectedDay.getTime() + 7 * 1000 * 3600 * 24),
    ]);
  }, [selectedDay]);

  const handleScroll = async (event) => {
    if (loading) return;
    setLoading(true);
    const offset = event.nativeEvent.contentOffset.x;
    const flatListWidth = event.nativeEvent.layoutMeasurement.width;

    if (offset === 0) await prevWeek(event);
    if (offset === 2 * flatListWidth) await nextWeek(event);

    setLoading(false);
  };

  const prevWeek = async (event) => {
    setDisplayedWeeks((prev) => [prev[0], prev[0], prev[1]]);
    scrollRef.current.scrollTo({ x: width, animated: false });
    await new Promise((resolve) => setTimeout(resolve, 1));
    setDisplayedWeeks((prev) => [
      getWeek(prev[0][0].getTime() - 7 * 1000 * 3600 * 24),
      prev[1],
      prev[2],
    ]);
  };

  const nextWeek = async () => {
    setDisplayedWeeks((prev) => [prev[1], prev[2], prev[2]]);
    scrollRef.current.scrollTo({ x: width, animated: false });
    await new Promise((resolve) => setTimeout(resolve, 1));
    setDisplayedWeeks((prev) => [
      prev[0],
      prev[1],
      getWeek(prev[2][0].getTime() + 7 * 1000 * 3600 * 24),
    ]);
  };

  useEffect(() => {
    changeScreenTitle(
      displayedWeeks[1][3].getMonth(),
      displayedWeeks[1][3].getFullYear(),
    );
  }, [displayedWeeks]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        pagingEnabled
        horizontal
        contentOffset={{ x: width }}>
        {displayedWeeks.map((week, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              width: width,
              justifyContent: "space-between",
              paddingHorizontal: 6,
            }}>
            {week.map((date, index) => (
              <Day
                key={index}
                date={date.getDate()}
                day={date.getDay()}
                onPress={() => setSelectedDay(date)}
                isSelected={compareDay(date, selectedDay)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Day = ({ day, date, isSelected, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...calendarStyle.dayContainer,
        backgroundColor: isSelected ? COLORS.primary : theme.box,
      }}>
      <Text
        style={{
          ...calendarStyle.dayText,
          color: isSelected ? COLORS.white : theme.text,
        }}>
        {calendar.day_short[(day + 6) % 7]}
      </Text>
      <Text
        style={{
          ...calendarStyle.dateText,
          color: isSelected ? COLORS.white : theme.text,
        }}>
        {date}
      </Text>
      <Text> </Text>
    </TouchableOpacity>
  );
};

export default DaySelector;
