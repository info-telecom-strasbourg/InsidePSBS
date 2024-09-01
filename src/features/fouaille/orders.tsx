import type { OrdersData } from "@/schemas/fouaille/orders.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { Order } from "./order";

type OrdersProps = {
  data: (OrdersData["data"]["orders"] | undefined)[] | undefined;
  size: number;
  setSize: (size: number) => void;
  isRefreshing: boolean;
  handleRefresh: () => Promise<void>;
};

export const Orders = ({
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
