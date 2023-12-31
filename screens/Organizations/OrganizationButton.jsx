import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./organizations.style";
import { ChevronRightIcon } from "../../assets/icons";
import { ROUTES } from "../../constants";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";
import { hideTextOverflow } from "../../utils";

const OrganizationButton = ({ data }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const dataTitle = data.short_name || data.name;
  return (
    <TouchableOpacity
      style={styles.container(theme)}
      onPress={() => router.push(`${ROUTES.organizations}/${data.id}`)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.imageContainer()}>
          <Image source={{ uri: data.logo_url }} style={styles.image()} />
        </View>
        <View style={{ width: 20 }} />
        <Text style={text_styles.title4(theme)}>
          {hideTextOverflow(dataTitle, 18)}
        </Text>
      </View>
      <ChevronRightIcon color={theme.text} />
    </TouchableOpacity>
  );
};

export default OrganizationButton;
