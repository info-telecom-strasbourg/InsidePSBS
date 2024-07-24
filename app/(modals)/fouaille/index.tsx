import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";
import { Balance } from "@app/(modals)/fouaille/_features/balance";
import { useBalance } from "@app/(modals)/fouaille/_features/fetch/balance.query";
import { useOrders } from "@app/(modals)/fouaille/_features/fetch/orders.query";
import { Orders } from "@app/(modals)/fouaille/_features/orders";

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
