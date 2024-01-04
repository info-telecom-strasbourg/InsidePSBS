import { PrimaryButton } from "components/Button";
import { ScrollScreenContainer } from "components/Containers";
import { TextInput } from "components/Inputs";
import { BackButtonTopbar } from "components/Topbar";
import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import TEXT from "constants/text";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useTheme } from "../../contexts/themeContext";

type EventFormProps = {
  title: string;
  description: string;
  start_at: Date;
  end_at: Date;
  location: string;
  body: string;
};

const EventFormScreen = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [MultipleDay, setMultipleDay] = useState(false);

  const [result, setResult] = useState<EventFormProps>({
    title: "",
    description: "",
    start_at: new Date(),
    end_at: new Date(),
    location: "",
    body: "",
  });
  const handleStartConfirmModal = (date) => {
    setShowStartDatePicker(false);
    setShowStartTimePicker(false);
    setResult((prev) => ({ ...prev, start_at: date }));
  };

  const handleEndConfirmModal = (date) => {
    setShowEndDatePicker(false);
    setShowEndTimePicker(false);
    setResult((prev) => ({ ...prev, end_at: date }));
  };

  const [error, setError] = useState("");

  const showHour = (time) => {
    const hour = time.toLocaleTimeString().split(":").slice(0, 2);
    return hour[0] + "h " + hour[1];
  };

  const handleSubmit = async (entries) => {
    // try {
    //   const res = await axios
    //     .post(`${env.API_URL}/api/post`, entries, {
    //       headers: {
    //         ...API.headers,
    //         Authorization: `Bearer ${data.token}`,
    //       },
    //     })
    //     .then((res) => {
    //       if (res.status === 201) {
    //         router.push(ROUTES.announcements);
    //       } else {
    //         setError(TEXT.form.error);
    //         console.log(res);
    //       }
    //     });
    // } catch (e) {
    //   console.log(e);
    //   if (e.response.status === 422) {
    //     setError(TEXT.form.errorFields);
    //   } else {
    //     setError(TEXT.form.error);
    //   }
    // }
  };
  const { theme } = useTheme();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.form.event.title}
      </BackButtonTopbar>
      <Text style={{ color: "orange" }}>{error}</Text>
      <View style={{ padding: 15 }}>
        <TextInput
          value={result.title}
          onChangeText={(val) => setResult((prev) => ({ ...prev, title: val }))}
          label={TEXT.form.event.name}
          multiline
          numberOfLines={1}
          style={{
            maxHeight: 100,
          }}
          maxLength={50}
        />

        <View style={{ height: 25 }} />
        {/*date  */}

        <Text onPress={() => setShowStartDatePicker(true)}>
          <Text style={[{ color: theme.text }, styles.textInputLabel]}>
            {TEXT.form.event.date} :{"  "}
          </Text>
          <Text
            style={[
              { backgroundColor: theme.box, color: theme.text },
              styles.textInputEntry,
            ]}>
            {result.start_at.toLocaleDateString()}
          </Text>
        </Text>

        <View style={{ height: 25 }} />
        {/*start time*/}
        <Text onPress={() => setShowStartTimePicker(true)}>
          <Text style={[{ color: theme.text }, styles.textInputLabel]}>
            {TEXT.form.event.start_time} :{"  "}
          </Text>
          <Text
            style={[
              { backgroundColor: theme.box, color: theme.text },
              styles.textInputEntry,
            ]}>
            {showHour(result.start_at)}
          </Text>
        </Text>

        <View style={{ height: 25 }} />
        <View style={{ flexDirection: "row" }}>
          <Text style={[{ color: theme.text }, styles.textInputLabel]}>
            {TEXT.form.event.multiple_dates}
          </Text>
          <View style={{ width: 10 }} />

          <CheckBox
            color={MultipleDay ? COLORS.primary : theme.text}
            onValueChange={setMultipleDay}
            value={MultipleDay}
          />
        </View>

        {MultipleDay ? (
          <>
            <View style={{ height: 25 }} />
            {/*date  */}

            <Text onPress={() => setShowEndDatePicker(true)}>
              <Text style={[{ color: theme.text }, styles.textInputLabel]}>
                {TEXT.form.event.end_date} :{"  "}
              </Text>
              <Text
                style={[
                  { backgroundColor: theme.box, color: theme.text },
                  styles.textInputEntry,
                ]}>
                {result.end_at.toLocaleDateString()}
              </Text>
            </Text>
          </>
        ) : (
          <View style={{ height: 25 }} />
        )}

        <View style={{ height: 25 }} />

        {/*end time*/}
        <Text onPress={() => setShowEndTimePicker(true)}>
          <Text style={[{ color: theme.text }, styles.textInputLabel]}>
            {TEXT.form.event.end_time} :{"  "}
          </Text>
          <Text style={[{ color: theme.text }, styles.textInputLabel]}>
            {showHour(result.end_at)}
          </Text>
        </Text>

        <DateTimePickerModal
          date={result.start_at}
          isVisible={showStartDatePicker}
          mode="date"
          onConfirm={handleStartConfirmModal}
          onCancel={() => setShowStartDatePicker(false)}
        />

        <DateTimePickerModal
          date={result.end_at}
          isVisible={showEndDatePicker}
          mode="date"
          onConfirm={handleEndConfirmModal}
          onCancel={() => setShowEndDatePicker(false)}
        />
        <DateTimePickerModal
          date={result.start_at}
          isVisible={showStartTimePicker}
          mode="time"
          onConfirm={handleStartConfirmModal}
          onCancel={() => setShowStartTimePicker(false)}
        />
        <DateTimePickerModal
          date={result.end_at}
          isVisible={showEndTimePicker}
          mode="time"
          onConfirm={handleEndConfirmModal}
          onCancel={() => setShowEndTimePicker(false)}
        />
        <View style={{ height: 25 }} />

        {/* Location */}
        <TextInput
          value={result.title}
          onChangeText={(val) => setResult((prev) => ({ ...prev, title: val }))}
          label={TEXT.form.event.location}
          multiline
          numberOfLines={1}
          style={{
            maxHeight: 100,
          }}
          maxLength={50}
        />
        {/* Description  */}
        <View style={{ height: 25 }} />
        <TextInput
          value={result.body}
          onChangeText={(val) => setResult((prev) => ({ ...prev, body: val }))}
          label={TEXT.form.event.description}
          multiline
          numberOfLines={1}
          style={{ height: 100, textAlignVertical: "top" }}
          maxLength={4000000000}
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

const styles = StyleSheet.create({
  textInputLabel: {
    fontSize: 18,
    fontFamily: FONTS.OpenSans.semiBold,
  },
  textInputEntry: {
    minHeight: 54,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 20,
  },
});
