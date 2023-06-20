import React, { useState } from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useFetch } from "../../hooks";
import { RefreshControl, Text, View } from "react-native";
import { useTheme } from "../../contexts";
import { text_styles } from "../../styles";

const OrganizationsScreen = () => {
  const url = "https://fouaille.bde-tps.fr/api/organization";

  const [refreshing, setRefreshing] = useState(false);

  const { res, isLoading, error, fetch } = useFetch(url);
  const { theme } = useTheme();

  const handleRefresh = () => {
    setRefreshing(true);
    fetch(url);
    setRefreshing(false);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
      <BackButtonTopbar>{TEXT.organizations.title}</BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <View style={{ alignItems: "center" }}></View>
          {res?.data.associations.map((association, index) => (
            <Text key={index} style={text_styles.body1(theme)}>
              {association.name}
            </Text>
          ))}
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default OrganizationsScreen;
