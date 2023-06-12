import React from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../../../constants";
import Widget from "./Widget";

const MpsWidget = ({ width, height }) => {
  const router = useRouter();
  return (
    <Widget
      backgroundColor={COLORS.black}
      onPress={() =>
        router.replace("https://nextcloud.its-tps.fr/s/J8C9b3YFPDMAjGH")
      }
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
