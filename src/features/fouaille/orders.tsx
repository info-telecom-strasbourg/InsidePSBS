import type { OrdersData } from "@/schemas/fouaille/fouaille.schema";
import { Text, View } from "react-native";

type OrdersProps = {
  data: OrdersData[] | undefined;
  size: number;
  setSize: (size: number) => void;
};

const Orders = ({ data, size, setSize }: OrdersProps) => {
  return (
    <View>
      <Text>Orders</Text>
    </View>
  );
};

export default Orders;
