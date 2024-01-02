import { View } from "react-native";

const Separator = ({
  vertical,
  horizontal,
  size = 20,
}: {
  vertical?: boolean;
  horizontal?: boolean;
  size: number;
}) => {
  return (
    <View
      style={{ height: vertical ? size : 0, width: horizontal ? size : 0 }}
    />
  );
};

export default Separator;
