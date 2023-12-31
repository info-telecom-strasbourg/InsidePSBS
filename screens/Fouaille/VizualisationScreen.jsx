import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";

import fouailleStyles from "./fouaille.style";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useTheme } from "../../contexts";
import { useLocalStorage } from "../../contexts/localStorageContext";
import { useFetch } from "../../hooks";

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
  let totalRecharge = 0;
  const consumedArticle = {};

  res?.data?.orders.forEach((item) => {
    if (item.total_price < 0) {
      totalSpent += parseFloat(item.total_price);
    } else if (item.total_price > 0) {
      totalRecharge += parseFloat(item.total_price);
    }
    if (item.product != null) {
      if (consumedArticle[item.product.name] == undefined) {
        consumedArticle[item.product.name] = 1;
      } else {
        consumedArticle[item.product.name] += 1;
      }
    }
  });
  console.log(consumedArticle);

  let PieData = [
    {
      values: consumedArticle.key,

      labels: consumedArticle.values,

      type: "pie",
    },
  ];
  const PieLayout = {
        height: 400,
        width: 400,
    };

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.fouaille.VizualisationTitle}</BackButtonTopbar>
      <View style={styles.wrapper}>
        <Text style={styles.card.title}>
          {TEXT.fouaille.vizualisation.totalSpent}: {totalSpent.toFixed(2)} €
          {"\n"}
          {TEXT.fouaille.vizualisation.totalRecharged}:
          {totalRecharge.toFixed(2)} €
        </Text>
        {/* <VictoryBar /> */}
      </View>
    </ScrollScreenContainer>
  );
};

export default VizualisationScreen;
