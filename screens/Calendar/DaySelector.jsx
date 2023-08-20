import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import getWeek from "../../utils/date/getWeek";

const DaySelector = ({ selectedDay, setSelectedDay }) => {
  const [loading, setLoading] = useState(false);
  const [displayedWeeks, setDisplayedWeeks] = useState([
    getWeek(selectedDay.getTime() - 7 * 1000 * 3600 * 24),
    getWeek(selectedDay.getTime()),
    getWeek(selectedDay.getTime() + 7 * 1000 * 3600 * 24),
  ]);
  const { width } = Dimensions.get("window");

  const handleScroll = async (event) => {
    if (loading) return;
    setLoading(true);
    const page = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );

    if (page === 0) await prevWeek(event);
    if (page === 2) await nextWeek(event);

    setLoading(false);
  };

  const nextWeek = async (event) => {
    setDisplayedWeeks((prev) => [prev[0], prev[0], prev[1]]);
    await new Promise((resolve) => setTimeout(resolve, 1));
    event.nativeEvent.contentOffset.x = width;
    setDisplayedWeeks((prev) => [
      getWeek(prev[0][0].getTime() - 7 * 1000 * 3600 * 24),
      prev[1],
      prev[2],
    ]);
  };

  const prevWeek = async () => {
    console.log("Prev week");
  };

  return (
    <View>
      <FlatList
        data={[1, 2, 3]}
        onMomentumScrollEnd={handleScroll}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        contentOffset={{ x: width }}
        renderItem={(d, index) => (
          <View
            key={index}
            style={{
              width: width,
              height: 50,
              borderColor: d === 0 ? "red" : d === 1 ? "blue" : "green",
              borderWidth: 4,
            }}
          />
        )}
      />
    </View>
  );
};

export default DaySelector;
