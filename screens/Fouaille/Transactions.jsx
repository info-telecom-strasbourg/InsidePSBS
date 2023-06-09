import React from "react";
import { Text, View } from "react-native";
import { COLORS, TEXT } from "../../constants";
import { ArrowDownIcon, ArrowUpIcon } from "../../assets/icons";
import fouailleStyles from "./fouaille.style";

const Transactions = ({ commands }) => {
  const styles = fouailleStyles();
  return (
    <View>
      <Text style={styles.transactions.title}>
        {TEXT.fouaille.transactions}
      </Text>
      <View style={styles.transactions.container}>
        {commands?.map(({ total_price }, index) => (
          <View key={index} style={styles.transactions.transaction}>
            {total_price > 0 ? (
              <ArrowUpIcon color={COLORS.dark_green} />
            ) : (
              <ArrowDownIcon color={COLORS.dark_red} />
            )}
            <Text style={styles.transactions.label}>{total_price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Transactions;
