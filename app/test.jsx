import React, { useState } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../constants";
import { getLayout } from "../utils";
import {
  ColoredButton,
  SecondaryButton,
  TouchableSettingsIcon,
  Badge,
  TextInput,
  BackButtonTopbar,
  DefaultTopbar,
  ScreenContainer,
} from "../components";
import { FouailleIcon, InsidePsbs } from "../assets/icons";
import { textStyles } from "../styles";

const Test = () => {
  const [layout, setLayout] = useState({});

  return (
    <ScreenContainer>
      <View onLayout={(e) => getLayout(e, setLayout)}>
        <DefaultTopbar>InsidePsbs</DefaultTopbar>
        <ColoredButton
          text="Suivant"
          color={COLORS.dark_purple}
          backgroundColor={COLORS.light_purple}
        />
        <SecondaryButton text="Bouton" />
        <TouchableSettingsIcon />
        <Badge
          text="1"
          color={COLORS.primary}
          backgroundColor={COLORS.background_dark}
          width={27}
        />
        <Text style={textStyles.title1(COLORS)}>Titre 1</Text>
        <TextInput
          label="Nom"
          color={COLORS.primary}
          background={COLORS.box_dark}
        />
      </View>
    </ScreenContainer>
  );
};

export default Test;
