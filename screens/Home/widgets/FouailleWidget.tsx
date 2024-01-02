import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import ROUTES from "constants/routes";
import TEXT from "constants/text";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Widget from "./Widget";
import { FouailleIcon } from "../../../assets/icons";
import { useLocalStorage } from "../../../contexts/localStorageContext";
import { useTheme } from "../../../contexts/themeContext";

const FouailleWidget = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const router = useRouter();

  const { data } = useLocalStorage();
  // const { res, error, isLoading } = useFetch(
  //   `${API.url}/api/fouaille?per_page=2`,
  //   {
  //     ...API.headers,
  //     Authorization: `Bearer ${data.token}`,
  //   },
  // );

  const { theme } = useTheme();

  const onPress = () => router.push(ROUTES.fouaille);

  // if (isLoading)
  //   return (
  //     <Widget
  //       width={width}
  //       height={height}
  //       backgroundColor={theme.box}
  //       onPress={onPress}>
  //       <ActivityIndicator />
  //     </Widget>
  //   );

  // if (error || !res?.data.balance)
  //   return <ErrorWidget width={width} height={height} onPress={onPress} />;

  return (
    <Widget
      backgroundColor={COLORS.light_purple}
      onPress={onPress}
      width={width}
      height={height}
      style={{ flexDirection: "row" }}>
      <View style={styles.iconWrapper}>
        <FouailleIcon width={64} height={64} color={COLORS.text} />
      </View>
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.title}>{TEXT.fouaille.title}</Text>
          {/* <Text style={styles.money}>{res.data.balance + "€"}</Text> */}
        </View>
        <View style={styles.transactionsWrapper}>
          {/* {res?.data.orders?.map((command, index) => (
            <View key={index} style={styles.transaction}>
              {command?.total_price < 0 ? (
                <ArrowDownIcon color={COLORS.dark_red} width={14} height={8} />
              ) : (
                <ArrowUpIcon color={COLORS.dark_green} width={14} height={8} />
              )}
              <Text style={styles.transactionText}>
                {command?.total_price}€
              </Text>
            </View>
          ))} */}
        </View>
      </View>
    </Widget>
  );
};

export default FouailleWidget;

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 10,
    backgroundColor: COLORS.dark_purple,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 14,
  },
  title: {
    fontSize: 22,
    color: COLORS.black,
    fontFamily: FONTS.OpenSans.semiBold,
  },
  money: {
    fontSize: 24,
    fontFamily: FONTS.OpenSans.bold,
  },
  transactionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    fontSize: 12,
  },
});
