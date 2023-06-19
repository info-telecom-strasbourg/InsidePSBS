import React from "react";
import { Text, View } from "react-native";

import transactionStyle from "./transaction.style";
import { TEXT } from "../../../constants";
import Transaction from "./Transaction";

const TransactionSection = ({ commands }) => {
  const styles = transactionStyle();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{TEXT.fouaille.transactions}</Text>
      <View>
        {commands?.map((transaction, index) => (
          <View key={index}>
            {index > 0 && <View style={{ height: 15 }} key={2 * index - 1} />}
            <Transaction data={transaction} key={2 * index} />
          </View>
        ))}
        <View style={{ height: 50 }} />
      </View>
    </View>
  );
};

export default TransactionSection;
