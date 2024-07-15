import { PageContainer } from "@/components/primitives/container";
import Balance from "@/features/fouaille/balance";
import Orders from "@/features/fouaille/orders";
import { Header } from "@/features/layout/header";
import { useBalance } from "@/queries/fouaille/balance.query";
import { useOrders } from "@/queries/fouaille/orders.query";

export default function FouaillePage() {
  const {
    data: balanceData,
    isLoading: balanceIsLoading,
    isRefreshing,
    handleRefresh,
  } = useBalance();

  console.log(balanceData);

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
      <Balance data={balanceData} isLoading={balanceIsLoading} />
      <Orders
        data={ordersData}
        size={size}
        setSize={setSize}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      />
    </PageContainer>
  );
}
