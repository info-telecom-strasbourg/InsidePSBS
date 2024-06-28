import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import Balance, { useBalance } from "@/features/fouaille/balance";
import Orders, { useOrders } from "@/features/fouaille/orders";
import { Header } from "@/features/layout/header";

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
  } = useOrders();

  return (
    <PageContainer>
      <Header title="Fouaille" rightIcon="close" />
      {!balanceData || balanceIsLoading ? (
        <PageLoading />
      ) : (
        <RefreshView
          isRefreshing={isRefreshing}
          handleRefresh={handleRefresh}
          contentContainerClassName="items-center justify-center"
        >
          <Balance data={balanceData} />
          <Typography size="h3">Publications</Typography>
          <Orders data={ordersData} />
        </RefreshView>
      )}
    </PageContainer>
  );
}
