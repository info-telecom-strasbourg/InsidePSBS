import { ScrollScreenContainer } from "components/Containers";
import { BackButtonTopbar } from "components/Topbar";
import TEXT from "constants/text";
import { useState } from "react";
import { RefreshControl } from "react-native";

import { useTheme } from "../../contexts/themeContext";

const FouailleScreen = () => {
  // const url = `${API.url}/api/fouaille?per_page=20`;
  // const headers = {
  //   ...API.headers,
  //   Authorization: `Bearer ${data.token}`,
  // };

  const [refreshing, setRefreshing] = useState(false);
  // const { res, error, isLoading, fetch } = useFetch(url, headers);
  const { theme } = useTheme();

  const handleRefresh = () => {
    // setRefreshing(true);
    // fetch(url, headers);
    // setRefreshing(false);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }>
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
      {/* {isLoading ? (
        <Loader />
      ) : error ? (
        <Text
          style={{
            ...text_styles.body2(theme),
            textAlign: "center",
            marginVertical: 20,
            marginHorizontal: 11,
          }}>
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
      )} */}
    </ScrollScreenContainer>
  );
};

export default FouailleScreen;
