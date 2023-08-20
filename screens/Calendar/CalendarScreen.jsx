import { useState } from "react";
import { ScrollScreenContainer, Topbar } from "../../components";
import { RefreshControl } from "react-native";
import getWeek from "../../utils/date/getWeek";
import calendar from "../../constants/text/calendar";
import { ChevronDownIcon } from "../../assets/icons";
import { useTheme } from "../../contexts";
import DaySelector from "./DaySelector";

const CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const { theme } = useTheme();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1)); // a implémenter avec le fetch
    setRefreshing(false);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
      <Topbar onPress={() => console.log("implémenter le modal")}>
        {calendar.month[selectedDay.getMonth()]} {selectedDay.getFullYear()}{" "}
        <ChevronDownIcon color={theme.text} width={22} height={13} />
      </Topbar>

      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </ScrollScreenContainer>
  );
};

export default CalendarScreen;
