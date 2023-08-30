import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PrimaryButton, ScreenContainer, Separator } from "../../../components";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import { useRouter, useLocalSearchParams } from "expo-router";
import CheckBox from "expo-checkbox";
import { Step4 } from "../../../assets/icons";
import { useRegister } from "../../../contexts/registerContext";
import toast from "../../../utils/toast";

const CguScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const { entries, signUp } = useRegister();

  const handleSubmit = async () => {
    console.log("submitting");
    setError("");
    if (!checked) {
      setError(TEXT.authentification.errors.cgu);
      return;
    }
    try {
      await signUp(entries);
      toast("Votre compte a été créé. Validez-le par email", {
        backgroundColor: theme.box,
        textColor: theme.text,
      });
    } catch (e) {
      toast(
        "Une erreur est survenue. Veuillez réessayer ou contacter un administrateur",
        {
          backgroundColor: COLORS.light_red,
          textColor: COLORS.dark_red,
        }
      );
      console.log(e.message);
    } finally {
      router.push(ROUTES.auth);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Step4
            TextColor={theme.text}
            DarkBackgroundColor={theme.box}
            AccentColor={COLORS.dark_orange}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            flex: 1,
          }}
        >
          <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
            {TEXT.authentification.register.cgu}
          </Text>
          <Separator size={25} vertical />
          <ScrollView style={{ flex: 1 }}>
            <Text style={text_styles.title3(theme)}>
              Politique de confidentialité pour l'application InsidePSBS: {"\n"}
            </Text>
            <Text style={text_styles.body3(theme)}>
              L'application InsidePSBS a été conçue pour faciliter la
              communication associative pour les écoles de Télécom Physique
              Strasbourg (TPS) et l'école supérieure de biologie de Strasbourg
              (ESBS). Nous sommes attachés à la protection de la vie privée de
              nos utilisateurs et nous nous engageons à respecter les lois et
              réglementations applicables en matière de protection des données.
              {"\n"}
              {"\n"}
              <Text style={text_styles.title3(theme)}>
                Collecte et utilisation des données{"\n"}
              </Text>
              <Text style={text_styles.body3(theme)}>
                Lorsque vous utilisez l'application InsidePSBS, nous collectons
                certaines informations vous concernant, notamment votre nom,
                prénom, identifiants relatifs à votre école (id, e-mail), vos
                photos de profil, vos appartenances à un club ou une association
                de l'école, ainsi que les informations nécessaires au
                fonctionnement de l'application (identifiants de notification).
                Ces informations sont nécessaires pour assurer le bon
                fonctionnement de l'application et pour faciliter la
                communication entre les utilisateurs. Elles ne seront jamais
                vendues à des tiers.{"\n"}
                {"\n"}
              </Text>
              <Text style={text_styles.title3(theme)}>
                Sécurité et confidentialité{"\n"}
              </Text>
              <Text style={text_styles.body3(theme)}>
                Nous prenons la sécurité et la confidentialité de vos données
                très au sérieux. Nous avons mis en place des mesures de sécurité
                appropriées pour protéger vos données contre tout accès non
                autorisé, toute utilisation abusive, toute altération ou toute
                perte de données. Toutes les données sensibles sont chiffrées
                pour empêcher tout accès non autorisé. Les données sont stockées
                sur des serveurs sécurisés, qui sont régulièrement mis à jour et
                surveillés pour détecter toute violation de sécurité.{"\n"}
                {"\n"}
              </Text>
              <Text style={text_styles.title3(theme)}>Vos droits{"\n"}</Text>
              <Text style={text_styles.body3(theme)}>
                Vous avez le droit de consulter les données que nous avons
                collectées vous concernant et de les supprimer si vous le
                souhaitez. Pour exercer ces droits, veuillez contacter un
                administrateur de l'application.{"\n"}
                {"\n"}
              </Text>
              <Text style={text_styles.title3(theme)}>
                Modifications de la politique de confidentialité{"\n"}
              </Text>
              <Text style={text_styles.body3(theme)}>
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment, en publiant une version mise à
                jour sur notre site web ou sur l'application. Il est de votre
                responsabilité de consulter régulièrement cette politique de
                confidentialité pour prendre connaissance des éventuelles
                modifications.{"\n"}
              </Text>
            </Text>
          </ScrollView>
          <Separator size={20} vertical />
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              color={checked ? COLORS.primary : theme.text}
              onValueChange={setChecked}
              value={checked}
            />
            <View style={{ width: 10 }} />
            <Text style={text_styles.body3(theme)}>
              {TEXT.authentification.register.accept_cgu}
            </Text>
          </View>
          <Separator size={10} vertical />
          <Text style={text_styles.body3({ text: COLORS.dark_red })}>
            {error}
          </Text>

          <Separator size={25} vertical />
          <PrimaryButton
            onPress={handleSubmit}
            text={TEXT.authentification.register.title}
          />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default CguScreen;
