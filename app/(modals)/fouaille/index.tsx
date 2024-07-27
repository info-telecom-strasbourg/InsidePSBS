import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Balance } from "@app/(modals)/fouaille/_features/balance";
import { useBalance } from "@app/(modals)/fouaille/_features/balance.query";
import { Orders } from "@app/(modals)/fouaille/_features/orders";
import { useOrders } from "@app/(modals)/fouaille/_features/orders.query";

export default function FouaillePage() {
  const { data: balanceData, isLoading: balanceIsLoading } = useBalance();

  const {
    data: ordersData,
    isLoading: ordersIsLoading,
    error: ordersError,
    size,
    setSize,
    isRefreshing,
    handleRefresh,
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
