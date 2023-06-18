import React from "react";
import { COLORS } from "../../../constants";
import { useRouter } from "expo-router";
import { Image } from "react-native";
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
