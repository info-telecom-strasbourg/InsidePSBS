import React from "react";
import {
  View,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from "../../../assets/icons";
import { COLORS } from "../../../constants";
import transactionStyle from "./transaction.style";
import { capitalize, getStringDate, getTimeDifference } from "../../../utils";
import { useTheme } from "../../../contexts/themeContext";

const Transaction = ({ data }) => {
  const styles = transactionStyle();
  const { theme } = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.transaction}
      onPress={() => setExpanded((expanded) => !expanded)}
    >
      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {data.total_price > 0 ? (
            <ArrowUpIcon color={COLORS.dark_green} />
          ) : (
            <ArrowDownIcon color={COLORS.dark_red} />
          )}
          <View style={{ width: 15 }} />
          <Text style={styles.label}>{data.total_price} €</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.date}>{getTimeDifference(data.date)}</Text>
          <View style={{ width: 15 }} />
          <ChevronDownIcon color={theme.text} height={13} width={13} />
        </View>
      </View>
      {expanded && (
        <>
          <View style={{ height: 15 }} />
          <View style={styles.row}>
            <Text style={styles.details}>
              {data.amount} x {capitalize(data.product.name)}
            </Text>

            <Text style={styles.details}>{getStringDate(data.date)}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Transaction;
