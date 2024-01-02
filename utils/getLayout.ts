import { Dispatch, SetStateAction } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

const getLayout = (
  event: LayoutChangeEvent,
  setLayout: Dispatch<SetStateAction<LayoutRectangle>>,
) => {
  setLayout(event.nativeEvent.layout);
};

export default getLayout;
