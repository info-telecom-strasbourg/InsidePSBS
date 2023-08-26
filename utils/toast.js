import Toast from "react-native-root-toast";

const toast = (backgroundColor, textColor) => {
  Toast.show("This is a toast", {
    duration: 5000,
    position: Toast.positions.BOTTOM,
    backgroundColor,
    textColor,
    opacity: 1,
  });
};

export default toast;
