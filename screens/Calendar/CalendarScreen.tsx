import { PlusButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import { Topbar } from "components/Topbar";
import ROUTES from "constants/routes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import debug from "utils/debug";

import DaySelector from "./DaySelector";
import EventList from "./EventList";
import { ChevronDownIcon } from "../../assets/icons";
import calendar from "../../constants/text/calendar";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

const CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [screenTitle, setScreenTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [eventList, setEventList] = useState([]);

  const changeScreenTitle = (month: number, year: number) => {
    setScreenTitle(`${calendar.month[month]} ${year}`);
  };

  const handleConfirmModal = (date) => {
    setShowDatePicker(false);
    setSelectedDay(date);
  };

  const router = useRouter();

  return (
    <>
      <ScrollScreenContainer
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              debug("à implémenter");
            }}
            refreshing={refreshing}
          />
        }>
        <Topbar onPress={() => setShowDatePicker(true)}>
          {screenTitle}{" "}
          <ChevronDownIcon color={theme.text} width={22} height={13} />
        </Topbar>
        <DateTimePickerModal
          date={selectedDay}
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleConfirmModal}
          onCancel={() => setShowDatePicker(false)}
        />

        <DaySelector
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          changeScreenTitle={changeScreenTitle}
        />
        {isLoading ? <Loader /> : <EventList data={eventList} />}
      </ScrollScreenContainer>
      <PlusButton onPress={() => router.push(ROUTES.add_event)} />
    </>
  );
};

export default CalendarScreen;
