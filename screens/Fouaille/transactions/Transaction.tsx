import COLORS from "constants/colors";
import FONTS from "constants/fonts";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import capitalize from "utils/capitalize";
import { getStringDateTime } from "utils/date/getStringDate";
import getTimeDifference from "utils/date/getTimeDifference";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../../../assets/icons";
import { useTheme } from "../../../contexts/themeContext";

type TransactionDataType = {
  total_price: number;
  date: Date;
  amount: number;
  product: {
    name: string;
  };
};

const Transaction = ({ data }: { data: TransactionDataType }) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        borderRadius: 10,
        backgroundColor: theme.box,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 2,
        flexDirection: "column",
      }}
      onPress={() => setExpanded((expanded) => !expanded)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {data.total_price > 0 ? (
            <ArrowUpIcon color={COLORS.dark_green} />
          ) : (
            <ArrowDownIcon color={COLORS.dark_red} />
          )}
          <View style={{ width: 15 }} />
          <Text
            style={{
              color: theme.text,
              fontSize: 15,
              fontFamily: FONTS.OpenSans.bold,
            }}>
            {data.total_price} €
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: theme.text_secondary,
              fontFamily: FONTS.OpenSans.bold,
              fontSize: 15,
            }}>
            {getTimeDifference(data.date)}
          </Text>
          <View style={{ width: 15 }} />
          {expanded ? (
            <ChevronUpIcon color={theme.text} height={13} width={13} />
          ) : (
            <ChevronDownIcon color={theme.text} height={13} width={13} />
          )}
        </View>
      </View>
      {expanded && (
        <>
          <View style={{ height: 15 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 15,
                fontFamily: FONTS.OpenSans.semiBold,
              }}>
              {data.total_price > 0
                ? "Rechargement"
                : `${data.amount} x ${capitalize(data?.product?.name || "")}`}
            </Text>

            <Text
              style={{
                color: theme.text,
                fontSize: 15,
                fontFamily: FONTS.OpenSans.semiBold,
              }}>
              {data.date ? getStringDateTime(data.date) : "erreur de date"}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Transaction;
