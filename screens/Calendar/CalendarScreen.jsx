import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { ChevronDownIcon } from "../../assets/icons";
import { ScrollScreenContainer, Topbar } from "../../components";
import calendar from "../../constants/text/calendar";
import { useTheme } from "../../contexts";
import DaySelector from "./DaySelector";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [screenTitle, setScreenTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const handleConfirmModal = (date) => {
    setShowDatePicker(false);
    setSelectedDay(date);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
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
    </ScrollScreenContainer>
  );
};

export default CalendarScreen;
