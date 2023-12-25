import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";

import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts";

const VizualisationScreen = () => {
  const { data } = useLocalStorage();

  const [refreshing, setRefreshing] = useState(false);
  const { res, error, isLoading, fetch } = useFetch(url, headers);
  const { theme } = useTheme();

  const handleRefresh = () => {
    setRefreshing(true);
    fetch(url, headers);
    setRefreshing(false);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
      <Text>Coucou</Text>
    </ScrollScreenContainer>
  );
};

export default FouailleScreen;
