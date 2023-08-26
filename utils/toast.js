import Toast from "react-native-root-toast";

const toast = (text, { backgroundColor, textColor }) => {
  Toast.show(text, {
    duration: 5000,
    position: Toast.positions.BOTTOM,
    backgroundColor,
    textColor,
    opacity: 1,
  });
};

export default toast;
