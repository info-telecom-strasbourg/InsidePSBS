import { ScrollScreenContainer } from "components/Containers";
import { BackButtonTopbar } from "components/Topbar";
import API from "constants/api";
import TEXT from "constants/text";
import { useState } from "react";
import { Text, View } from "react-native";
import { env } from "utils/env";

import { useLocalStorage } from "../../contexts/localStorageContext";
import { useTheme } from "../../contexts/themeContext";

const VizualisationScreen = () => {
  const { data } = useLocalStorage();

  const url = `${env.API_URL}/api/fouaille?per_page=100000000`;
  const headers = {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  };

  const [refreshing, setRefreshing] = useState(false);
  // const { res, error, isLoading, fetch } = useFetch(url, headers);

  const { theme } = useTheme();
  // console.log(res.data.orders);
  const totalSpent = 0;
  const totalRecharge = 0;
  const consumedArticle = {};

  // res?.data?.orders.forEach((item) => {
  //   if (item.total_price < 0) {
  //     totalSpent += parseFloat(item.total_price);
  //   } else if (item.total_price > 0) {
  //     totalRecharge += parseFloat(item.total_price);
  //   }
  //   if (item.product != null) {
  //     if (consumedArticle[item.product.name] == undefined) {
  //       consumedArticle[item.product.name] = 1;
  //     } else {
  //       consumedArticle[item.product.name] += 1;
  //     }
  //   }
  // });
  console.log(consumedArticle);

  // const PieData = [
  //   {
  //     values: consumedArticle.key,

  //     labels: consumedArticle.values,

  //     type: "pie",
  //   },
  // ];
  const PieLayout = {
    height: 400,
    width: 400,
  };

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.fouaille.vizualisation.title}</BackButtonTopbar>
      <View style={{ flex: 1, paddingHorizontal: 11 }}>
        <Text
          style={{
            color: theme.text,
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 5,
          }}>
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
