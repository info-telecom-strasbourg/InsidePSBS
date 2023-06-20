import React, { useState } from "react";
import { View } from "react-native";

import { getLayout } from "../../../utils";
import DefaultWidget from "./DefaultWidget";
import FouailleWidget from "./FouailleWidget";
import MpsWidget from "./MpsWidget";
import { useRouter } from "expo-router";
import { ROUTES } from "../../../constants";

const WidgetSection = () => {
  const [{ width }, setLayout] = useState({ width: 0 });
  const gap = 12;
  const widgetSize = (size = 1) => (width / 3 - gap) * size + gap * (size - 1);
  const router = useRouter();

  const widgetTable = [
    [
      <FouailleWidget width={widgetSize(2)} height={widgetSize()} />,
      <DefaultWidget
        width={widgetSize()}
        height={widgetSize()}
        onPress={() => {
          router.push(ROUTES.organizations);
        }}
      />,
    ],
    [
      <MpsWidget width={widgetSize()} height={widgetSize()} />,
      <DefaultWidget width={widgetSize()} height={widgetSize()} />,
      <DefaultWidget width={widgetSize()} height={widgetSize()} />,
    ],
  ];

  return (
    <View onLayout={(e) => getLayout(e, setLayout)}>
      {widgetTable.map((row, r_id) => (
        <View key={r_id}>
          {r_id > 0 && <View style={{ height: gap }} />}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {row.map((widget, w_id) => (
              <View key={w_id} style={{ flexDirection: "row" }}>
                {w_id > 0 && <View style={{ width: gap }} />}
                {widget}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default WidgetSection;
