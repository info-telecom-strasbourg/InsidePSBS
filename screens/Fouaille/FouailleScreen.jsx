import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";

import fouailleStyles from "./fouaille.style";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import Card from "./Card";
import TransactionSection from "./transactions/TransactionSection";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";

const FouailleScreen = () => {
  const { data } = useLocalStorage();
  const url = `${API.url}/api/fouaille?per_page=20`;
  const headers = {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  };

  const [refreshing, setRefreshing] = useState(false);
  const { res, error, isLoading, fetch } = useFetch(url, headers);
  const { theme } = useTheme();

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
      ) : error ? (
        <Text
          style={{
            ...text_styles.body2(theme),
            textAlign: "center",
            marginVertical: 20,
            marginHorizontal: 11,
          }}
        >
          {TEXT.common.error.loading}
        </Text>
      ) : res?.data.balance ? (
        <View style={styles.wrapper}>
          <Card
            firstname={res?.data.first_name}
            lastname={res?.data.last_name}
            money={res?.data.balance}
          />
          <TransactionSection commands={res?.data.orders} />
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>{TEXT.fouaille.noBalance}</Text>
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default FouailleScreen;
