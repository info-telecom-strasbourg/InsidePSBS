import React from "react";
import { Alert, Image } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, TEXT } from "../../../constants";
import Widget from "./Widget";

const MpsWidget = ({ width, height }) => {
  const handlePress = () => {
    Alert.alert(TEXT.common.redirect.title, TEXT.common.redirect.description, [
      {
        text: TEXT.common.redirect.cancel,
      },
      {
        text: TEXT.common.redirect.continue,
        onPress: () =>
          router.replace("https://nextcloud.its-tps.fr/s/J8C9b3YFPDMAjGH"),
      },
    ]);
  };

  const router = useRouter();
  return (
    <Widget
      backgroundColor={COLORS.black}
      onPress={handlePress}
      style={{ borderColor: COLORS.white, borderWidth: 1 }}
      width={width}
      height={height}
    >
      <Image
        source={require("../../../assets/images/mps.png")}
        style={{ width: "100%", height: "100%" }}
      />
    </Widget>
  );
};

export default MpsWidget;
