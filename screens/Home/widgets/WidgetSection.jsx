import React, { useState } from "react";
import { View } from "react-native";

import { getLayout } from "../../../utils";
import MpsWidget from "./MpsWidget";
import { useRouter } from "expo-router";
import { COLORS, ROUTES } from "../../../constants";
import FouailleWidget from "./FouailleWidget";
import { PeopleIcon, RestaurantIcon, ShirtIcon } from "../../../assets/icons";
import Widget from "./Widget";

const WidgetSection = () => {
  const [{ width }, setLayout] = useState({ width: 0 });
  const gap = 12;
  const widgetSize = (size = 1) => (width / 3 - gap) * size + gap * (size - 1);
  const router = useRouter();

  const widgetTable = [
    [
      <FouailleWidget width={widgetSize(2)} height={widgetSize()} />,
      <Widget
        width={widgetSize()}
        height={widgetSize()}
        backgroundColor={COLORS.dark_green}
        onPress={() => {
          router.push(ROUTES.organizations);
        }}
      >
        <PeopleIcon color={COLORS.light_green} width={70} height={70} />
      </Widget>,
    ],
    [
      <MpsWidget width={widgetSize()} height={widgetSize()} />,
      <Widget
        width={widgetSize()}
        height={widgetSize()}
        backgroundColor={COLORS.dark_blue}
      >
        <ShirtIcon color={COLORS.light_blue} width={90} height={80} />
      </Widget>,
      <Widget
        width={widgetSize()}
        height={widgetSize()}
        backgroundColor={COLORS.dark_orange}
      >
        <RestaurantIcon color={COLORS.light_orange} width={60} height={80} />
      </Widget>,
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
