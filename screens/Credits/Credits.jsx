import React, { useState } from "react";
import { Text, View } from "react-native";
import { BackButtonTopbar, ScrollScreenContainer } from "../../components";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

import { FONTS, TEXT } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreditsScreen = () => {
  const { theme } = useTheme();
  return (
    <ScrollScreenContainer>
      <BackButtonTopbar rightIcon={null}>
        {TEXT.credits.page_name}
      </BackButtonTopbar>
      <View
        style={{
          marginHorizontal: 15,
          gap: 20,
          backgroundColor: theme.box,
          paddingVertical: 25,
          borderRadius: 20,
          paddingHorizontal: 15,
        }}
      >
        <CreditsSection
          title={TEXT.credits.frontend_title}
          contributors={[TEXT.credits.romain, TEXT.credits.gatien]}
        />
        <CreditsSection
          title={TEXT.credits.backend_title}
          contributors={[TEXT.credits.enzo, TEXT.credits.felix]}
        />
        <CreditsSection
          title={TEXT.credits.debug_title}
          contributors={[TEXT.credits.alexander]}
        />
        <CreditsSection
          title={TEXT.credits.logo_title}
          contributors={[TEXT.credits.jeanne]}
        />
        <CreditsSection
          title={TEXT.credits.Crousbot_title}
          contributors={[TEXT.credits.thomas]}
        />
      </View>
    </ScrollScreenContainer>
  );
};

const CreditsSection = ({ title, contributors }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <Text
        style={{
          ...text_styles.body1(theme),
          fontFamily: FONTS.OpenSans.bold,
        }}
      >
        {title}
      </Text>
      <View style={{ gap: 5 }}>
        {contributors.map((contributor, id) => (
          <Credit contributor={contributor} key={id} />
        ))}
      </View>
    </View>
  );
};

const Credit = ({ contributor }) => {
  const [id, setId] = useState(0);
  const { theme } = useTheme();

  const incrementId = () => {
    setId((id) => (id + 1) % contributor.length);
  };

  return (
    <TouchableOpacity onPress={incrementId}>
      <Text style={text_styles.body2({ text: theme.text })}>
        • {contributor[id]}
      </Text>
    </TouchableOpacity>
  );
};

export default CreditsScreen;
