import Toast from "react-native-root-toast";

const toast = (
  text: string,
  {
    backgroundColor,
    textColor,
  }: { backgroundColor: string; textColor: string },
) => {
  Toast.show(text, {
    duration: 8000,
    position: Toast.positions.TOP,
    hideOnPress: false,
    backgroundColor,
    textColor,
    opacity: 1,
  });
};

export default toast;
