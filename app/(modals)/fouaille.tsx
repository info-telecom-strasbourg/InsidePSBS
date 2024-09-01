import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Balance } from "@/features/fouaille/balance";
import { Order } from "@/features/fouaille/order";
import { useBalance } from "@/queries/fouaille/balance.query";
import { useOrders } from "@/queries/fouaille/orders.query";
import type { OrdersData } from "@/schemas/fouaille/orders.schema";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";

export default function FouaillePage() {
  const {
    data: balanceData,
    isLoading: balanceIsLoading,
    handleRefresh: handleRefreshBalance,
    isRefreshing: balanceIsRefreshing,
  } = useBalance();

  const {
    data: ordersData,
    size,
    setSize,
    isRefreshing: ordersAreRefreshing,
    handleRefresh: handleRefreshPosts,
    hasMore,
    isLoading: ordersAreLoading,
  } = useOrders();

  const orders = ordersData ? ordersData.flat() : [];

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1);
    }
  };

  const handleRefresh = () => {
    handleRefreshBalance();
    handleRefreshPosts();
  };

  return (
    <PageContainer>
      <Header title="Fouaille" rightIcon="close" />
      {ordersAreLoading || balanceIsLoading ? (
        <PageLoading />
      ) : (
        <FlashList<OrdersData["data"]["orders"][0] | undefined>
          data={orders}
          onEndReached={loadMore}
          onEndReachedThreshold={3}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Order order={item} />}
          ListHeaderComponent={() => <Balance data={balanceData} />}
          refreshControl={
            <RefreshControl
              refreshing={balanceIsRefreshing || ordersAreRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </PageContainer>
  );
}
