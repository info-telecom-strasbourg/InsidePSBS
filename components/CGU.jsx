import React from "react";
import { useTheme } from "../contexts";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { text_styles } from "../styles";
const CGUText = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={text_styles.title3(theme)}>
        Politique de confidentialité pour l'application InsidePSBS: {"\n"}
      </Text>
      <Text style={text_styles.body3(theme)}>
        L'application InsidePSBS a été conçue pour faciliter la communication
        associative pour les écoles de Télécom Physique Strasbourg (TPS) et
        l'école supérieure de biologie de Strasbourg (ESBS). Nous sommes
        attachés à la protection de la vie privée de nos utilisateurs et nous
        nous engageons à respecter les lois et réglementations applicables en
        matière de protection des données.
        {"\n"}
        {"\n"}
        <Text style={text_styles.title3(theme)}>
          Collecte et utilisation des données{"\n"}
        </Text>
        <Text style={text_styles.body3(theme)}>
          Lorsque vous utilisez l'application InsidePSBS, nous collectons
          certaines informations vous concernant, notamment votre nom, prénom,
          identifiants relatifs à votre école (id, e-mail), vos photos de
          profil, vos appartenances à un club ou une association de l'école,
          ainsi que les informations nécessaires au fonctionnement de
          l'application (identifiants de notification). Ces informations sont
          nécessaires pour assurer le bon fonctionnement de l'application et
          pour faciliter la communication entre les utilisateurs. Elles ne
          seront jamais vendues à des tiers.{"\n"}
          {"\n"}
        </Text>
        <Text style={text_styles.title3(theme)}>
          Sécurité et confidentialité{"\n"}
        </Text>
        <Text style={text_styles.body3(theme)}>
          Nous prenons la sécurité et la confidentialité de vos données très au
          sérieux. Nous avons mis en place des mesures de sécurité appropriées
          pour protéger vos données contre tout accès non autorisé, toute
          utilisation abusive, toute altération ou toute perte de données.
          Toutes les données sensibles sont chiffrées pour empêcher tout accès
          non autorisé. Les données sont stockées sur des serveurs sécurisés,
          qui sont régulièrement mis à jour et surveillés pour détecter toute
          violation de sécurité.{"\n"}
          {"\n"}
        </Text>
        <Text style={text_styles.title3(theme)}>Vos droits{"\n"}</Text>
        <Text style={text_styles.body3(theme)}>
          Vous avez le droit de consulter les données que nous avons collectées
          vous concernant et de les supprimer si vous le souhaitez. Pour exercer
          ces droits, veuillez contacter un administrateur de l'application.
          {"\n"}
          {"\n"}
        </Text>
        <Text style={text_styles.title3(theme)}>
          Modifications de la politique de confidentialité{"\n"}
        </Text>
        <Text style={text_styles.body3(theme)}>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment, en publiant une version mise à jour sur
          notre site web ou sur l'application. Il est de votre responsabilité de
          consulter régulièrement cette politique de confidentialité pour
          prendre connaissance des éventuelles modifications.{"\n"}
        </Text>
      </Text>
    </ScrollView>
  );
};

export default CGUText;
