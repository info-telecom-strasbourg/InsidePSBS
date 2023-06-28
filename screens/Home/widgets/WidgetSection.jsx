import React, { useState } from "react";
import { Alert, View } from "react-native";

import { getLayout } from "../../../utils";
import { useRouter } from "expo-router";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import FouailleWidget from "./FouailleWidget";
import {
  CrousIcon,
  CTSIcon,
  ImageIcon,
  PeopleIcon,
  ShirtIcon,
} from "../../../assets/icons";
import Widget from "./Widget";

const WidgetSection = () => {
  const [{ width }, setLayout] = useState({ width: 0 });
  const gap = 12;
  const widgetSize = (size = 1) => (width / 3 - gap) * size + gap * (size - 1);
  const router = useRouter();

  const mpsPress = () => {
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
      <Widget
        width={widgetSize()}
        height={widgetSize()}
        backgroundColor={COLORS.dark_red}
        onPress={mpsPress}
      >
        <ImageIcon color={COLORS.light_red} width={80} height={80} />
      </Widget>,
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
        backgroundColor={COLORS.light_red}
        onPress={() => {
          router.push(ROUTES.crousbot);
        }}
      >
        <CrousIcon color={COLORS.dark_red} width={90} height={80} />
      </Widget>,
    ],
    [
      <Widget
        width={widgetSize()}
        height={widgetSize()}
        backgroundColor={COLORS.light_red}
        onPress={() => {
          router.push(ROUTES.cts);
        }}
      >
        <CTSIcon color={COLORS.dark_red} width={80} height={80} />
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
