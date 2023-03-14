import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles,lightprimaryColor } from "../style/style";
// ne devrait pas être utilisé mais permet de comprendre le fonctionnement
// seul DatePickerModal est utile ici
const Example = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  var test='2022-04-08T08:27:00';
  var SelectedDate = new Date(test);
  
  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={SelectedDate}
        //minimumDate ne fonctionne pas bien sur android quand couplé avec date
        //minimumDate={new Date()}

        //pour éviter de set des rappels dans le passé
        positiveButton={{label: 'Définir', textColor: lightprimaryColor}}
        neutralButton={{label: 'Effacer', textColor: lightprimaryColor}}
        negativeButton={{label: 'Annuler', textColor: 'red'}}

        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Example;