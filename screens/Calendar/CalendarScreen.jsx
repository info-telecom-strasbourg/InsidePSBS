import { useEffect, useState } from "react";
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
  const [screenTitle, setScreenTitle] = useState("");
  const { theme } = useTheme();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1)); // a implémenter avec le fetch
    setRefreshing(false);
  };

  const changeScreenTitle = (month, year) => {
    setScreenTitle(`${calendar.month[month]} ${year}`);
  };

  useEffect(() => {
    changeScreenTitle(selectedDay.getMonth(), selectedDay.getFullYear());
  }, [selectedDay]);

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
      <Topbar onPress={() => console.log("implémenter le modal")}>
        {screenTitle}{" "}
        <ChevronDownIcon color={theme.text} width={22} height={13} />
      </Topbar>

      <DaySelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        changeScreenTitle={changeScreenTitle}
      />
    </ScrollScreenContainer>
  );
};

export default CalendarScreen;
