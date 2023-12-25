import React, { useState } from "react";
import { useFetch } from "../../hooks";

import { RefreshControl, Text, View } from "react-native";

import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts";
import fouailleStyles from "./fouaille.style";

const VizualisationScreen = () => {
  const styles = fouailleStyles();

  const { data } = useLocalStorage();

  const url = `${API.url}/api/fouaille?per_page=100000000`;
  const headers = {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  };

  const [refreshing, setRefreshing] = useState(false);
  const { res, error, isLoading, fetch } = useFetch(url, headers);

  const { theme } = useTheme();
  console.log(res?.data.orders);
  // console.log(res.data.orders);
  let totalSpent = 0;

  res?.data?.orders.forEach((item) => {
    if (item.total_price < 0) {
      let unit_price = parseFloat(item.product.unit_price);
      if (unit_price < 0) {
        totalSpent += unit_price * item.amount;
      }
    }
  });

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.fouaille.VizualisationTitle}</BackButtonTopbar>
      <View style={styles.wrapper}>
        <Text style={styles.card.title}>
          {TEXT.fouaille.vizualisation.totalSpent}: {totalSpent} €
        </Text>
      </View>
    </ScrollScreenContainer>
  );
};

export default VizualisationScreen;
