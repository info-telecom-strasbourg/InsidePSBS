import { useFetch } from "@/hooks/useFetch";
import { OrdersSchema, type OrdersData } from "@/schemas/fouaille/orders.schema";

export const useFouailleOrders = () => {
  return useFetch<OrdersData>({
    apiEndpoint: "fouaille", 
    schema: OrdersSchema,
    queryKey: ["fouaille-orders"],
  });
};