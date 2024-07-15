import { Order } from "@/components/primitives/order";
import type { OrdersData } from "@/schemas/GET/fouaille/orders.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";

type OrdersProps = {
  data: (OrdersData["data"]["orders"] | undefined)[] | undefined;
  size: number;
  setSize: (size: number) => void;
  isRefreshing: boolean;
  handleRefresh: () => void;
};

const Orders = ({
  data,
  size,
  setSize,
  isRefreshing,
  handleRefresh,
}: OrdersProps) => {
  const orders = data ? data.flat() : [];

  const loadMore = () => {
    setSize(size + 1);
  };
  return (
    <FlashList<OrdersData["data"]["orders"][0] | undefined>
      data={orders}
      onEndReached={loadMore}
      onEndReachedThreshold={3}
      estimatedItemSize={50}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <Order order={item} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default Orders;
