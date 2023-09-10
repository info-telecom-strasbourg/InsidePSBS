import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
  Separator,
} from "../../components";
import { text_styles } from "../../styles";

import { COLORS, ROUTES, TEXT, ERRORS } from "../../constants";

const CreditsScreen = () => {
  //ugly credits screen, to be improved
  const { theme } = useTheme();

  return (
    <ScrollScreenContainer>
      <View>
        <BackButtonTopbar rightIcon={null}>
          {TEXT.credits.page_name}
        </BackButtonTopbar>

        <Text style={text_styles.title3({ text: COLORS.text_secondary })}>
          {TEXT.credits.frontend_title}
        </Text>
        <Text style={text_styles.body1({ text: COLORS.text })}>
          {TEXT.credits.frontend}
        </Text>

        <Text style={text_styles.title3({ text: COLORS.text_secondary })}>
          {TEXT.credits.backend_title}
        </Text>
        <Text style={text_styles.body1({ text: COLORS.text })}>
          {TEXT.credits.backend}
        </Text>
        {/* add this info :     backend_title: "Backend",
    backend:"Enzo Bergamini et Félix Lusseau",
    debug_title: "Debug",
    debug:"Alexander Yanovskyy",
    logo_title: "Logo",
    logo:"Jeanne König-Wacheux",
    Crousbot_title: "Crousbot",
    Crousbot:"Thomas Dumond", */}
        <Text style={text_styles.title3({ text: COLORS.text_secondary })}>
          {TEXT.credits.debug_title}
        </Text>
        <Text style={text_styles.body1({ text: COLORS.text })}>
          {TEXT.credits.debug}
        </Text>
        <Text style={text_styles.title3({ text: COLORS.text_secondary })}>
          {TEXT.credits.logo_title}
        </Text>
        <Text style={text_styles.body1({ text: COLORS.text })}>
          {TEXT.credits.logo}
        </Text>
        <Text style={text_styles.title3({ text: COLORS.text_secondary })}>
          {TEXT.credits.Crousbot_title}
        </Text>
        <Text style={text_styles.body1({ text: COLORS.text })}>
          {TEXT.credits.Crousbot}
        </Text>
      </View>
    </ScrollScreenContainer>
  );
};

export default CreditsScreen;
