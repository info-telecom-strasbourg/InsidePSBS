import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import Balance from "@/features/fouaille/balance";
import Orders from "@/features/fouaille/orders";
import { Header } from "@/features/layout/header";
import { useBalance } from "@/queries/fouaille/balance.query";
import { useOrders } from "@/queries/fouaille/orders.query";
import { View } from "react-native";

export default function FouaillePage() {
  const {
    data: balanceData,
    isLoading: balanceIsLoading,
    error: balanceError,
    isRefreshing,
    handleRefresh,
  } = useBalance();

  const {
    data: ordersData,
    isLoading: ordersIsLoading,
    error: ordersError,
    size,
    setSize,
  } = useOrders();

  return (
    <PageContainer>
      <Header title="Fouaille" rightIcon="close" />
      <RefreshView isRefreshing={isRefreshing} handleRefresh={handleRefresh}>
        {!balanceData || balanceIsLoading || !ordersData || ordersIsLoading ? (
          <PageLoading />
        ) : (
          <>
            <View className="items-center justify-center">
              <Balance data={balanceData} />
            </View>
            <Typography size="h3" className="my-3">
              Commandes
            </Typography>
            <View>
              <Orders data={ordersData} size={size} setSize={setSize} />
            </View>
          </>
        )}
      </RefreshView>
    </PageContainer>
  );
}
