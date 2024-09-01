import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { OrdersSchema } from "@/schemas/fouaille/orders.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = OrdersSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }

  return parsedData.data?.data.orders;
};

const getKey = (pageIndex: number) => {
  return `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille?page=${
    pageIndex + 1
  }`;
};

export const useOrders = () => {
  const { token } = useAuth();

  const res = useFetchInfinite(
    (pageIndex) => getKey(pageIndex),
    (url) => fetcher(url, token || "")
  );
  const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;
  return { ...res, hasMore };
};
