import React, { useState } from "react";
import { RefreshControl, View } from "react-native";

import fouailleStyles from "./fouaille.style";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import Card from "./Card";
import TransactionSection from "./transactions/TransactionSection";

const FouailleScreen = () => {
  const { data } = useLocalStorage();
  const url = "https://app-pprd.its-tps.fr/api/fouaille?per_page=20";
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${data.token}`,
  };
  const [refreshing, setRefreshing] = useState(false);
  const { res, error, isLoading, fetch } = useFetch(url, headers);

  const handleRefresh = () => {
    setRefreshing(true);
    fetch(url, headers);
    setRefreshing(false);
  };

  const styles = fouailleStyles();
  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    >
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.wrapper}>
          <Card
            firstname={res?.data.first_name}
            lastname={res?.data.last_name}
            money={res?.data.balance}
          />
          <TransactionSection commands={res?.data.orders} />
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default FouailleScreen;
