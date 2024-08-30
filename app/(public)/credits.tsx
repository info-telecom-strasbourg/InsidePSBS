import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { SettingsButton } from "@app/(modals)/settings/_features/settings-button";
import { SettingsTitle } from "@app/(modals)/settings/_features/settings-title";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const creditData = [
  {
    title: "FrontEnd",
    items: [
      {
        title: "Fabio Tocco",
        subtitle: [
          "Charismatique",
          "Fan de clash d'astéroïde",
          "Parrain de la mafia",
        ],
      },
      {
        title: "Romain Bourdain",
        subtitle: ["A son prime", "Président de TPS", "Petit prince du web"],
      },
      {
        title: "Gatien Chenu",
        subtitle: ["La vachette de TPS", "Superhero", "Roi des roulades"],
      },
      {
        title: "Alexander Yanovskyy",
        subtitle: ["Le boss", "Sabaka gaff gaff", "Fan du caca"],
      },
    ],
  },
  {
    title: "BackEnd",
    items: [
      {
        title: "Thibault Deslandes",
        subtitle: [
          "Gros branleur",
          "Le second pire VP Tech de l'histoire",
          "Il pue en plus",
        ],
      },
      {
        title: "Enzo Bergamini",
        subtitle: [
          "La merde",
          "Le premier pire VP Tech de l'histoire",
          "Un peu gentil",
        ],
      },
      {
        title: "Félix Lusseau",
        subtitle: ["Grand maître des serveurs"],
      },
    ],
  },
  {
    title: "Debug",
    items: [
      {
        title: "Alexander Yanovskyy",
        subtitle: [
          "Toujours au top",
          "Tellement le boss qu'on dirait Bowser",
          "Raciste néanmoins",
        ],
      },
    ],
  },
  {
    title: "Design",
    items: [
      {
        title: "Romain Bourdain",
        subtitle: [
          "Le roi des pirates",
          "L'homme idéal",
          "Le Picasso de Figma",
        ],
      },
      {
        title: "Jeane König-Wacheux",
        subtitle: ["Logo de l'app"],
      },
    ],
  },
];

export default function CreditsPage() {
  return (
    <PageContainer>
      <Header title="Credits" rightIcon="close" leftIcon="back" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-3">
          {creditData.map((section, i) => (
            <View key={i}>
              <SettingsTitle label={section.title}></SettingsTitle>
              {section.items.map((item, j) => (
                <CreditsItem
                  key={j}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </PageContainer>
  );
}

type CreditItemProps = {
  title: string;
  subtitle: string[];
};

const CreditsItem = ({ title, subtitle }: CreditItemProps) => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  return (
    <SettingsButton
      label={title}
      subtitle={subtitle[subtitleIndex]}
      onPress={() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitle.length);
      }}
    />
  );
};
