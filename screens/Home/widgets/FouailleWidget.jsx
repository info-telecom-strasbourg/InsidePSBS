import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useRouter } from "expo-router";

import fouailleWidgetStyle from "./fouaillewidget.style";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FouailleIcon,
} from "../../../assets/icons";
import { API, COLORS, ROUTES, TEXT } from "../../../constants";
import Widget from "./Widget";
import { useTheme } from "../../../contexts";
import ErrorWidget from "./ErrorWidget";
import { useLocalStorage } from "../../../contexts/localStorageContext";
import { useFetch } from "../../../hooks";

const FouailleWidget = ({ width, height }) => {
  const router = useRouter();

  const { data } = useLocalStorage();
  const { res, error, isLoading } = useFetch(
    `${API.url}/api/fouaille?per_page=2`,
    {
      ...API.headers,
      Authorization: `Bearer ${data.token}`,
    }
  );

  const { theme } = useTheme();

  const styles = fouailleWidgetStyle();

  const onPress = () => router.push(ROUTES.fouaille);

  if (isLoading)
    return (
      <Widget
        width={width}
        height={height}
        backgroundColor={theme.box}
        onPress={onPress}
      >
        <ActivityIndicator />
      </Widget>
    );

  if (error)
    return <ErrorWidget width={width} height={height} onPress={onPress} />;

  return (
    <Widget
      backgroundColor={COLORS.light_purple}
      size={2}
      onPress={onPress}
      width={width}
      height={height}
      style={{ flexDirection: "row" }}
    >
      <View style={styles.iconWrapper}>
        <FouailleIcon width={64} height={64} color={COLORS.light_purple} />
      </View>
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.title}>{TEXT.fouaille.title}</Text>
          <Text style={styles.money}>{res?.data.balance}€</Text>
        </View>
        <View style={styles.transactionsWrapper}>
          {res?.data.orders?.map((command, index) => (
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
          ))}
        </View>
      </View>
    </Widget>
  );
};

export default FouailleWidget;
