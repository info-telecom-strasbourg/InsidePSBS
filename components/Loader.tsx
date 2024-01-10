import Lottie from "lottie-react-native";
import { Dispatch, SetStateAction } from "react";
import {
  Dimensions,
  RefreshControl,
  RefreshControlProps,
  View,
} from "react-native";

export const Loader = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height - 100,
      }}>
      <Lottie
        source={require("assets/loaders/loader.json")}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
    </View>
  );
};

export const Refresh = ({
  onRefresh,
  refreshing,
  setRefreshing,
}: RefreshControlProps & {
  setRefreshing: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  };

  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
};
