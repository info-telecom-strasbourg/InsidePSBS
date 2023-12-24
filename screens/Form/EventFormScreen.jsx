import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  ScrollScreenContainer,
  BackButtonTopbar,
  PrimaryButton,
  TextInput,
} from "../../components";
import { API, TEXT, ROUTES } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import axios from "axios";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../../components/input/input.style";

const EventFormScreen = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleConfirmModal = (date) => {
    setShowDatePicker(false);
    setSelectedDay(date);
  };
  const router = useRouter();

  const [error, setError] = useState("");
  const [result, setResult] = useState({
    title: "",
    body: "",
    color: "#ffffff",
  });
  const { data } = useLocalStorage();
  const showHour = (time) => {
    const hour = time.toLocaleTimeString().split(":").slice(0, 2);
    return hour[0] + "h " + hour[1];
  };

  const handleSubmit = async (entries) => {
    //check the content of the field to verify not too long
    try {
      const res = await axios
        .post(`${API.url}/api/post`, entries, {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            router.push(ROUTES.announcements);
          } else {
            setError(TEXT.form.error);
            console.log(res);
          }
        });
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setError(TEXT.form.errorFields);
      } else {
        setError(TEXT.form.error);
      }
      return;
    }
  };
  const { theme } = useTheme();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.form.event.title}
      </BackButtonTopbar>
      <View style={{ height: 15 }} />
      <Text style={{ color: "orange" }}>{error}</Text>
      <View style={{ padding: 15 }}>
        <TextInput
          value={result.title}
          onChangeText={(val) => setResult((prev) => ({ ...prev, title: val }))}
          label={TEXT.form.event.name}
          multiline={true}
          numberOfLines={1}
          style={{
            maxHeight: 100,
          }}
          maxLength={50}
        />
        <View style={{ height: 25 }} />
        <TextInput
          value={result.body}
          onChangeText={(val) => setResult((prev) => ({ ...prev, body: val }))}
          label={TEXT.form.event.description}
          multiline={true}
          numberOfLines={1}
          style={{ height: 300, textAlignVertical: "top" }}
          maxLength={4000000000}
        />
        <View style={{ height: 25 }} />
        {/*date  */}

        <Text onPress={() => setShowDatePicker(true)}>
          <Text style={styles.textInputLabel(theme)}>
            {TEXT.form.event.date}:{"   "}
          </Text>
          <Text style={[styles.textInputEntry(theme)]}>
            {selectedDay.toLocaleDateString()}
          </Text>
        </Text>
        <View style={{ height: 25 }} />
        {/*time  */}
        <Text onPress={() => setShowTimePicker(true)}>
          <Text style={styles.textInputLabel(theme)}>
            {TEXT.form.event.time}:{"   "}
          </Text>
          <Text style={styles.textInputEntry(theme)}>
            {showHour(selectedDay)}
          </Text>
        </Text>

        <DateTimePickerModal
          date={selectedDay}
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleConfirmModal}
          onCancel={() => setShowDatePicker(false)}
        />
        <DateTimePickerModal
          date={selectedTime}
          isVisible={showTimePicker}
          mode="time"
          onConfirm={handleConfirmModal}
          onCancel={() => setShowTimePicker(false)}
        />

        <View style={{ height: 25 }} />
        <PrimaryButton
          text={TEXT.form.event.send}
          onPress={() => handleSubmit(result)}
        />
      </View>
    </ScrollScreenContainer>
  );
};

export default EventFormScreen;
