import React, { useState } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../constants";
import { getLayout } from "../utils";
import {
  DefaultWidget,
  Widget,
  ColoredButton,
  SecondaryButton,
  TouchableSettingsIcon,
  Badge,
} from "../components";
import { FouailleIcon, InsidePsbs } from "../assets/icons";
import { textStyles } from "../styles";
import Topbar from "../components/topbar/Topbar";
import DefaultTopbar from "../components/topbar/DefaultTopbar";
import BackButtonTopbar from "../components/topbar/BackButtonTopbar";

const Test = () => {
  const [layout, setLayout] = useState({});

  return (
    <View onLayout={(e) => getLayout(e, setLayout)}>
      <DefaultTopbar>InsidePsbs</DefaultTopbar>
      <ColoredButton
        text="Suivant"
        color={COLORS.dark_purple}
        backgroundColor={COLORS.light_purple}
      />
      <SecondaryButton text="Bouton" />
      <View style={{ flexDirection: "row" }}>
        <DefaultWidget
          backgroundColor={COLORS.light_red}
          height={layout.width / 3}
          width={layout.width / 3}
          foregroundColor={COLORS.dark_red}
          text="Test"
          icon={<FouailleIcon color={COLORS.dark_red} height={59} width={59} />}
        />
        <TouchableSettingsIcon />
        <Badge
          text="1"
          color={COLORS.white}
          backgroundColor={COLORS.primary}
          width={27}
        />
      </View>
      <Text style={textStyles.title1(COLORS)}>Titre 1</Text>
    </View>
  );
};

export default Test;
