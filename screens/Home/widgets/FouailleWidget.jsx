import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useRouter } from "expo-router";

import fouailleWidgetStyle from "./fouaillewidget.style";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FouailleIcon,
} from "../../../assets/icons";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import { useFetch } from "../../../hooks";
import Widget from "./Widget";
import { useTheme } from "../../../contexts";
import ErrorWidget from "./ErrorWidget";

const FouailleWidget = ({ width, height }) => {
  const router = useRouter();
  const userid = 1;
  const { res, error, isLoading } = useFetch(
    `https://fouaille.bde-tps.fr/api/fouaille/${userid}?page_size=2`
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
          {res?.data.commands?.map((command, index) => (
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
