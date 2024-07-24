import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { balanceFetcher } from "@app/(modals)/fouaille/_features/fetch/balance.query";

export const useCards = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/balance`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => balanceFetcher(url, token || ""));
  return res;
};
