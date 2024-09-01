import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Balance } from "@/features/fouaille/balance";
import { Orders } from "@/features/fouaille/orders";
import { useBalance } from "@/queries/fouaille/balance.query";
import { useOrders } from "@/queries/fouaille/orders.query";

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
    handleRefresh: handleRefreshOrders,
  } = useOrders();

  const handleRefresh = async () => {
    handleRefreshBalance();
    handleRefreshOrders();
  };

  return (
    <PageContainer>
      <Header title="Fouaille" rightIcon="close" />
      <Balance data={balanceData} isLoading={balanceIsLoading} />
      <Orders
        data={ordersData}
        size={size}
        setSize={setSize}
        isRefreshing={ordersAreRefreshing || balanceIsRefreshing}
        handleRefresh={handleRefresh}
      />
    </PageContainer>
  );
}
