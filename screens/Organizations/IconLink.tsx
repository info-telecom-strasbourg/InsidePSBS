import { ReactNode } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

const IconLink = ({
  link,
  icon,
  onPress,
}: {
  link: string;
  icon: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  if (!link) return null;
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 15, marginVertical: 15 }}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconLink;
