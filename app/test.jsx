import React, { useState } from "react";
import { View } from "react-native";
import { COLORS } from "../constants";
import { getLayout } from "../utils";
import {
  DefaultWidget,
  Widget,
  ColoredButton,
  SecondaryButton,
  TouchableSettingsIcon,
} from "../components";
import { FouailleIcon } from "../assets/icons";

const Test = () => {
  const [layout, setLayout] = useState({});

  return (
    <View onLayout={(e) => getLayout(e, setLayout)}>
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
      </View>
    </View>
  );
};

export default Test;
