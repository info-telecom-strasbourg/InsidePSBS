import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ChevronDownIcon } from "../../assets/icons";
import { Loader, ScrollScreenContainer, Topbar } from "../../components";
import calendar from "../../constants/text/calendar";
import { useTheme } from "../../contexts";
import DaySelector from "./DaySelector";
import { useLocalStorage } from "../../contexts/localStorageContext";
import axios from "axios";
import { API, ROUTES } from "../../constants";
import EventList from "./EventList";
import { getStringDate } from "../../utils";
import createDateFromDDMMYYYY from "../../utils/date/createDateFromDDMMYYYY";
import PlusButton from "../../components/touchableicon/PlusButton";

const CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [screenTitle, setScreenTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();
  const { data } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [eventList, setEventList] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const currentDate = createDateFromDDMMYYYY(getStringDate(selectedDay));
      const nextDate = createDateFromDDMMYYYY(
        getStringDate(new Date(selectedDay).setDate(selectedDay.getDate() + 1))
      );
      const res = await axios.get(
        `${API.url}/api/event?start_at=${currentDate}&end_at=${nextDate}`, // a changer bug lorsque la date est sur 2 jours
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      setEventList(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const changeScreenTitle = (month, year) => {
    setScreenTitle(`${calendar.month[month]} ${year}`);
  };

  useEffect(() => {
    changeScreenTitle(selectedDay.getMonth(), selectedDay.getFullYear());
    setEventList([]);
    fetchData();
  }, [selectedDay]);

  const handleConfirmModal = (date) => {
    setShowDatePicker(false);
    setSelectedDay(date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
        {isLoading ? <Loader /> : <EventList data={eventList} />}
      </ScrollScreenContainer>
      <PlusButton url={ROUTES.add_event} />
    </>
  );
};

export default CalendarScreen;
