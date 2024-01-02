import { ScrollScreenContainer } from "components/Containers";
import { Body1, Body2 } from "components/Text";
import { BackButtonTopbar } from "components/Topbar";
import FONTS from "constants/fonts";
import TEXT from "constants/text";
import { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useTheme } from "../../contexts/themeContext";

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
        }}>
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

const CreditsSection = ({
  title,
  contributors,
}: {
  title: string;
  contributors: string[][];
}) => {
  return (
    <View
      style={{
        gap: 10,
      }}>
      <Body1
        style={{
          fontFamily: FONTS.OpenSans.bold,
        }}>
        {title}
      </Body1>
      <View style={{ gap: 5 }}>
        {contributors.map((contributor, id) => (
          <Credit contributor={contributor} key={id} />
        ))}
      </View>
    </View>
  );
};

const Credit = ({ contributor }: { contributor: string[] }) => {
  const [id, setId] = useState(0);

  const incrementId = () => {
    setId((id) => (id + 1) % contributor.length);
  };

  return (
    <TouchableOpacity onPress={incrementId}>
      <Body2>• {contributor[id]}</Body2>
    </TouchableOpacity>
  );
};

export default CreditsScreen;
