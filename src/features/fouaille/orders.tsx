import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { type FouailleData, FouailleSchema } from "@/schemas/fouaille.schema";
import { Text, View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = FouailleSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useOrders = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

const Orders = ({ data }: { data: FouailleData["data"] }) => {
  return (
    <View>
      <Text>Orders</Text>
    </View>
  );
};

export default Orders;
