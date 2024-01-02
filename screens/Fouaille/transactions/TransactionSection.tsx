import TEXT from "constants/text";
import { useTheme } from "contexts/themeContext";
import { Text, View } from "react-native";

import Transaction from "./Transaction";

type CommandType = {
  total_price: number;
  date: Date;
  amount: number;
  product: {
    name: string;
  };
};

const TransactionSection = ({ commands }: { commands: CommandType[] }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 20,
          marginBottom: 15,
          marginHorizontal: 10,
          marginTop: 50,
        }}>
        {TEXT.fouaille.transactions}
      </Text>
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
