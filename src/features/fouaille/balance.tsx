import { useAuth } from "@/auth/useAuth";
import { Typography } from "@/components/primitives/typography";
import { useFetch } from "@/hooks/useFetch";
import type { FouailleBalanceData } from "@/schemas/fouaille.schema";
import { FouailleBalanceSchema } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Nfc } from "lucide-react-native";
import { View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = FouailleBalanceSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useBalance = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/balance`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

const Balance = ({ data }: { data: FouailleBalanceData["data"] }) => {
  const { theme } = useTheme();
  return (
    <View className="m-4 flex-1 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-10">
      <View className="flex-1 gap-4">
        <Typography size="h4" className="text-muted-foreground">
          Carte Fouaille
        </Typography>
        <Typography size="h1" fontWeight="bold">
          {data.balance}€
        </Typography>
        <Typography size="h3" fontWeight="semibold">
          {`${data.first_name} ${data.last_name}`}
        </Typography>
      </View>
      <View>
        <Nfc className="size-24" color={colors[theme].foreground} />
      </View>
    </View>
  );
};

export default Balance;
